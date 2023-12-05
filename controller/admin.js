import * as userRepository from '../data/auth.js';
import * as adminRepository from '../data/admin.js'
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import jwt from 'jsonwebtoken';

export async function adminLogin(req, res) {
    const { adminId, adminPassword } = req.body;

    // 데이터베이스에서 사용자 조회
    const userdata = await adminRepository.findByAdminid(adminId);

    if (!userdata) {
        return res.status(401).json({ message: '아이디를 찾을 수 없음'});
    }

    const isValidpassword = await bcrypt.compare(adminPassword, userdata.adminPassword);


    if(!isValidpassword){
        return res.status(401).json({message:'비밀번호가 틀림'});
    }

    const token = createJwtToken(userdata._id);

    res.status(200).json({ token, adminId });
}

function createJwtToken(id){
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
};


// [관리자] 전체 조회
export async function getUsersList(req, res) {
    const users = await adminRepository.getAllUsers();
    res.status(200).json(users);
}

// [관리자] 사용자 생성
export async function createUser(req, res) {
    const { userid, userpassword, username, gender, age, phnumber } = req.body;
    
    // 중복 사용자 검사
    const existingUser = await userRepository.findByUserid(userid);
    if (existingUser) {
        return res.status(409).json({ message: '이미 존재하는 사용자입니다.' });
    }

    // 비밀번호 해시
    const hashedPassword = bcrypt.hashSync(userpassword, config.bcrypt.saltRounds);

    // 사용자 생성
    const createdUser = await userRepository.createUser({
        userid,
        userpassword: hashedPassword,
        username,
        gender,
        age,
        phnumber
    });

    res.status(201).json(createdUser);
}

//[관리자] 사용자 정보 수정
export async function updateUser(req, res) {   
    const id = req.params.id;
    const { username, gender, age, phnumber } = req.body;
    // 사용자 존재 여부 확인
    const user = await userRepository.findById(id);
    if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 사용자 정보 업데이트
    await adminRepository.updateUser(id, { username, gender, age, phnumber });
    res.status(200).json({ message: '사용자 정보가 업데이트 되었습니다.' });
}

//[관리자] 사용자 삭제
export async function deleteUser(req, res) {
    const id = req.params.id;

    // 사용자 존재 여부 확인
    const user = await userRepository.findById(id);
    if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 사용자 삭제
    await adminRepository.deleteUser(id);
    res.status(200).json({ message: '사용자가 삭제되었습니다.' });
}

// [관리자] 공지사항 생성
export async function createNotice(req, res) {
    const { title, content } = req.body;
    const createdAt = new Date(); // 현재 시간으로 작성시간 설정
    const notice = {
        title,
        content,
        createdAt
    };

    // 공지사항을 데이터베이스에 저장
    const createdNotice = await adminRepository.createNotice(notice);
    res.status(201).json(createdNotice); // 생성된 공지사항 반환
}

//[관리자] 공지사항 수정
export async function updateNotice(req, res) {
    const { id, update } = req.body;
    const updatedNotice = await adminRepository.updateNotice(id, update);
    if (!updatedNotice.matchedCount) {
        return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
    }
    res.status(200).json({ message: '공지사항이 업데이트 되었습니다.' });
}

//[관리자] 공지사항 삭제
export async function deleteNotice(req, res) {
    const id = req.params.id;
    const deletedNotice = await adminRepository.deleteNotice(id);
    if (!deletedNotice.deletedCount) {
        return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
    }
    res.status(200).json({ message: '공지사항이 삭제되었습니다.' });
}

//[관리자] 전체 공지사항 조회
export async function getNotices(req, res) {
    const notices = await adminRepository.getAllNotices();
    res.status(200).json(notices);
}