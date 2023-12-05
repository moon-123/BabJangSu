import MongoDb from 'mongodb';
import { config } from '../config.js';

let db;
export async function connectDB(databaseName) {
    try {
        const connection= await mongoose.connect(config.db.host, { dbName: databaseName });
        // db = mongoose.connection;
        console.log('MongoDB connected successfully!');
        return connection.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
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
