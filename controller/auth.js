import * as userRepository from '../data/auth.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from '../config.js';


export async function signup(req, res){
    const {username, phnum, gender, age} = req.body;

    const isUser = await userRepository.findByUsername(username);   // username 중복 확인.

    if(isUser){
        return res.status(409).json({message: `username \'${username}\' is already exist`}); // 중복되었다 -> 409
    }

    // 입력된 비밀번호 hash처리
    const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds);     
    
    // hash된 비밀번호와 나머지 정보로 create User, Token
    // 몸무게, 알러지, 운동량 등 나머지 정보는 null값 가질 수 있음
    const userId = await userRepository.createUser({username, password: hashed, phnum, gender, age}); 

    // userId = result.insertedId.toString()
    const token = createJwtToken(userId);
    res.status(201).json( {token, username} );
};

// 존맛탱 토큰 만드는 함수, 매개변수 헷갈림 주의
function createJwtToken(id){
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
};


export async function login(req, res){
    const { username, phnum } = req.body;

    const user = await userRepository.findByUsername(username);
    console.log(user);
    if(!user){
        return res.status(401).json({message: 'no Id'});
    }

    const isValidPassword = await bcrypt.compare(phnum, user.phnum)
    // await 대신에 compareSync 써도 됨
    if(!isValidPassword){
        return res.status(401).json({message: '비밀번호 틀림'});
    }

    // user의 id값 주의.
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
};
