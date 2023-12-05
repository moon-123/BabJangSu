import * as userRepository from '../data/auth.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as message from './message.js';


// 인증번호와 전화번호를 임시로 저장할 객체
const verificationStorage = {};

export async function signup(req, res){
    const { userid, userpassword, username, gender, age, phnumber, verificationCode } = req.body;

    try {
        // 클라이언트로부터 받은 인증코드와 인증 메시지를 보냅니다.
        const { verificationCode: sentVerificationCode } = await message.sendVerificationMessage(phnumber);

        // 클라이언트로부터 받은 인증코드와 저장된 인증코드를 비교합니다.
        if (!sentVerificationCode || sentVerificationCode !== verificationCode) {
            console.log("인증 실패: 클라이언트 코드와 저장된 코드 불일치");
            return res.status(401).json({ message: '잘못된 인증번호입니다.' });
        }

        const userdata = await userRepository.findByUserid(userid);

        if (userdata) {
            return res.status(409).json({ message: '이미 사용중인 아이디 입니다.' });
        }

        const hashed = bcrypt.hashSync(userpassword, config.bcrypt.saltRounds);

        // 결합된 전화번호와 나머지 정보로 User 생성
        const result = await userRepository.createUser({
            userid,
            userpassword: hashed,
            username,
            gender,
            age,
            phnumber
        });

        const token = createJwtToken(result);
        res.status(201).json({ token, userid });

        // 회원가입 성공 후 인증번호 정보를 삭제
        delete verificationStorage[phnumber];
    } catch (error) {
        console.error("signup 함수 오류:", error); // 에러 메시지 출력
        res.status(500).json({ message: '회원가입 실패', error: error.toString() });
    }
};

// 존맛탱 토큰 만드는 함수, 매개변수 헷갈림 주의
function createJwtToken(id){
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
};

export async function login(req, res) {
    const { userid, userpassword } = req.body;

    // 데이터베이스에서 사용자 조회
    const userdata = await userRepository.findByUserid(userid);

    if (!userdata) {
        return res.status(401).json({ message: '아이디를 찾을 수 없음'});
    }

    const isValidpassword = await bcrypt.compare(userpassword, userdata.userpassword);

    if(!isValidpassword){
        return res.status(401).json({message:'비밀번호가 틀림'});
    }

    const token = createJwtToken(userdata.id);
    res.status(200).json({ token, userid });
}

export async function me(req, res, next) {

    const user = await userRepository.findById(req.id);

    if (!user) {
        return res.status(404).json({ message: `사용자를 찾을 수 없음` });
    }

    res.status(200).json({ 
        token: user.id, 
        username: user.username,
        gender: user.gender,
        age: user.age
    });
}

export async function searchuserid(req, res, next){
    const { username, phnumber } = req.body;

    try {
        // 데이터베이스에서 username, phnumber가 모두 일치하는 사용자를 찾습니다.
        const user = await userRepository.findByUsernamephnumber(username, phnumber);

        if (user) {
            // 사용자를 찾았다면 사용자의 아이디를 응답합니다.
            res.status(200).json({ userId: user.userid });
        } else {
            // 일치하는 사용자가 없다면 적절한 메시지와 함께 404 상태 코드를 보냅니다.
            res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
    } catch (error) {
        // 에러 처리
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function findPassword(req, res, next){
    const { userid, phnumber, verificationCode } = req.body;

    try {
        // 사용자 아이디를 데이터베이스에서 확인
        const user = await userRepository.findByUserid(userid);

        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 저장된 인증번호와 제출된 인증번호를 비교
        const storedCode = message.getVerificationCode(phnumber);

        if (verificationCode !== storedCode) {
            return res.status(400).json({ message: '잘못된 인증번호' });
        }

        // 로그인 성공 시 토큰을 생성하고 응답에 포함
        const token = createJwtToken(user.id);
        res.status(200).json({ message: '인증 및 로그인 성공', token });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.toString() });
    }
}

export async function changePassword(req, res) {
    const { newPassword } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: '인증이 필요합니다.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        // JWT 검증 및 사용자 ID 추출
        const decoded = jwt.verify(token, config.jwt.secretKey);
        const userid = decoded.id;

        // 데이터베이스에서 사용자 찾기
        const user = await userRepository.findById(userid);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 새 비밀번호 암호화
        const hashedNewPassword = bcrypt.hashSync(newPassword, config.bcrypt.saltRounds);

        // 데이터베이스에 새 비밀번호 업데이트
        await userRepository.updatePassword(userid, hashedNewPassword);

        res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '비밀번호 변경 중 오류 발생', error: error.toString() });
    }
}