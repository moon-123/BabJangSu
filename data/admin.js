import MongoDb from 'mongodb';
// import { db } from '../db/database.js';
import { getUsers, system_admins } from '../db/database.js';
// mongo 에서 객체마다의 아이디값에 해당하는 부분.
const ObjectId = MongoDb.ObjectId;

import { getNotices } from '../db/database.js';

// [관리자]계정 조회
export async function findByAdminid(id){
    return system_admins().find({ _id: new ObjectId(id) })
}

// 사용자 전체 조회
// [관리자]모든 사용자 목록 가져오기
export async function getAllUsers() {
    return getUsers().find().toArray();
}

// [관리자]사용자 정보 업데이트
export async function updateUser(id, updateData) {
    const result = await getUsers().updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );

    return result.modifiedCount === 1;
}

// [관리자]사용자 삭제
export async function deleteUser(id) {
    const result = await getUsers().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
}

// [관리자]공지사항 생성
export async function createNotice(notice) {
    return getNotices().insertOne(notice);
}

// [관리자]공지사항 수정
export async function updateNotice(id, update) {
    return getNotices().updateOne(
        { _id: new ObjectId(id) },
        { $set: update }
    );
}

// [관리자]공지사항 삭제
export async function deleteNotice(id) {
    return getNotices().deleteOne({ _id: new ObjectId(id) });
}

// [관리자]공지사항 조회
export async function getAllNotices() {
    return getNotices().find().toArray();
}