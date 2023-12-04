import express from "express";
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js'
import * as messageController from '../controller/message.js';
import { isAuth } from '../middleware/auth.js';
import adminRouter from './admin.js';

const router = express.Router();

// validation
const validateLogin = [
    body('userid').notEmpty().withMessage('아이디는 반드시 입력되어야 함.'),
    body('userpassword')
        .trim()
        .notEmpty()
        .withMessage('비밀번호 번호는 반드시 입력되어야 합니다.')
        .isLength({ max: 4}).withMessage('비밀번호는 4자리 입니다.'),
    validate
];

const validateSignup = [
    body('userid').notEmpty().withMessage('이름은 반드시 입력해야 합니다.'),
    body('userpassword')
        .trim()
        .notEmpty()
        .withMessage('비밀번호는 반드시 입력되야함.')
        .isLength({ max: 4 }).withMessage('비밀번호는 4자리 입니다.'),
    body('username').notEmpty().withMessage('이름은 반드시 입력'),
    body('age').isInt({ min: 0, max: 120 }).withMessage('유효한 나이를 입력해 주세요'),
    body('gender').isIn(['male', 'female']).withMessage('유효한 성별을 입력해 주세요'),
    validate
];


// router.get('/', authController.getUsers);
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

// 사용자 아이디 찾기
router.post('/searchID', authController.searchuserid);

// 사용자 비밀번호 찾기
router.post('/searchPW', authController.findPassword);

// 사용자 비밀번호 변경
router.post('/changePW', authController.changePassword);

// 내 정보 보기
router.get('/me', isAuth, authController.me);

// 인증번호 전송을 위한 라우트
router.post('/sendVerification', messageController.sendVerification);

// 인증번호 검증을 위한 라우트
router.post('/verifyCode', messageController.verifyCode);

// 관리자 라우팅
router.use('/administrator', adminRouter);

export default router;