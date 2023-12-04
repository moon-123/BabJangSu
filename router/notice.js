import express from "express";
import * as adminController from '../controller/admin.js';

const router = express.Router();

// 공지사항 관련 라우팅

// 공지사항 목록 조회
router.get('/notices', adminController.getNotices); 

// 공지사항 생성
router.post('/notices', adminController.createNotice); 

// 공지사항 업데이트
router.put('/notices/:id', adminController.updateNotice); 

// 공지사항 삭제
router.delete('/notices/:id', adminController.deleteNotice); 

export default router;