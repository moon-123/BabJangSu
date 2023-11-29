import MongoDb from 'mongodb';
// import { db } from '../db/database.js';
import { getUsers } from '../db/database.js';

// mongo 에서 객체마다의 아이디값에 해당하는 부분.
const ObjectId = MongoDb.ObjectId;

// username으로 user정보 가져오기
export async function findByUsername(username){
    return getUsers()
        .find({ username })
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
    return getUsers()
        .insertOne(user)
        .then((result) => console.log(result.insertedId.toString()));
}


// _id 값을 가진 id 항목 추가해서 반환
function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}