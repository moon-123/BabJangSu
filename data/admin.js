import { User } from './auth.js';

import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true },
    adminPassword: { type: String, required: true }
},{
    collection: 'admin_accounts'
});

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
}},{
    collection: 'notices_board'
});

const Admin = mongoose.model('Admin', adminSchema);
const Notice = mongoose.model('Notice', noticeSchema);

// [관리자] 계정 조회
export async function findByAdminid(adminId){
    return Admin.findOne({ adminId });
}

// [관리자] 모든 사용자 목록 가져오기
export async function getAllUsers() {
    return User.find();
}

// [관리자] 사용자 정보 업데이트
export async function updateUser(id, updateData) {
    const result = await User.updateOne({ _id: id }, { $set: updateData });
    return result.modifiedCount === 1;
}

// [관리자] 사용자 삭제
export async function deleteUser(id) {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount === 1;
}

// [관리자] 공지사항 생성
export async function createNotice(noticeData) {
    const notice = new Notice(noticeData);
    return notice.save();
}

// [관리자] 공지사항 수정
export async function updateNotice(id, title, content) {
    const updatenotice = await Notice.findByIdAndUpdate(id, { title, content }, { new: true });

    if (!updatenotice) {
        return null; // 공지사항을 찾을 수 없을 때 null을 반환
    }

    return updatenotice; // 업데이트된 공지사항 객체를 반환
}

// [관리자] 공지사항 삭제
export async function deleteNotice(id) {
    const result = await Notice.findByIdAndDelete(id);

    if(!result){
        console.error('공지사항을 찾지 못했습니다.')
    }
    return result
}

// [관리자] 공지사항 조회
export async function getAllNotices() {
    return Notice.find();
}