import MongoDb from 'mongodb';
// import { db } from '../db/database.js';
import { getUsers } from '../db/database.js';

// mongo 에서 객체마다의 아이디값에 해당하는 부분.
const ObjectId = MongoDb.ObjectId;

// userid으로 user정보 가져오기
export async function findByUserid(userid){
    return getUsers()
        .find({ userid })
        .next()
        .then(mapOptionalUser);
}

// object id인 _id로 찾기, 고유값
export async function findById(id){
    return getUsers()
        .find({ _id: new ObjectId(id) })
        .next()
        .then(mapOptionalUser);
}

// i
export async function createUser(user){
    const result = await getUsers().insertOne(user);
    return result.insertedId.toString();
}

// 사용자 아이디 찾기
export async function findByUsernamephnumber(username, phnumber) {
    return getUsers()
        .findOne({ username: username, phnumber: phnumber })
}

// 사용자 비밀번호 변경
export async function updatePassword(userid, hashedNewPassword){
    const result = await getUsers().updateOne(
        { _id: new ObjectId(userid) }, // 사용자를 찾기 위한 필터
        { $set: { userpassword: hashedNewPassword } } // 업데이트할 내용
    );

    return result.modifiedCount === 1; // 비밀번호 변경 성공 여부 반환
}


// _id 값을 가진 id 항목 추가해서 반환
function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}