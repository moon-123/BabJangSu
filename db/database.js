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

// 민주
// recipe database가 bob 외부에 있어서 따로 함수 만들었음
export async function connectrecipeDB() {
    try {
        const connection = await Mongoose.connect(config.db.host, {
            dbName: "recipe"
        });
        db = connection.connection; // Assign the connection to db
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// 레시피가 들어있는 컬렉션
export function getallrecipe() {
    return db.collection("all");
}

// bob이랑 연결하는 건데 그냥 connectDB로 해도 될 것 같아요
// data-> savedata의 connectsaveDB를 connectDB로 고치면 됨
export async function connectsaveDB() {
    try {
        const connection = await Mongoose.connect(config.db.host, {
            dbName: "bob"
        });
        db = connection.connection; // Assign the connection to db
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// save 컬렉션에 있는 데이터를 모두 가져오는 함수
export function getuserecipe() {
    return db.collection("user_recipes");
}

//

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
