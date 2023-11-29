import MongoDb from 'mongodb';
import { config } from '../config.js';

let db;
export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host)
        .then((client) => db = client.db());
} 


// collection 을 리턴해주는 함수.

// users
export function getUsers(){
    return db.collection('users');
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
