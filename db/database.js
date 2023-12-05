import MongoDb from 'mongodb';
import { config } from '../config.js';

let db;
export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host)
        .then((client) => db = client.db('bob'));
} 

// 관리자 컬렉션
export function system_admins(){
    return db.collection('admin_accounts')
}

// 관리자 공지사항
export function getNotices(){
    return db.collection('notices_board')
}

// collection 을 리턴해주는 함수.

// users
export function getUsers(){
    return db.collection('user_information');
}

// user_recipe
export function getRecipe(){
    return db.collection('user_recipe');
}

// user_meal
export function getMeal(){
    return db.collection('user_meal');
}

// user_health
export function getHealth(){
    return db.collection('user_health');
}
