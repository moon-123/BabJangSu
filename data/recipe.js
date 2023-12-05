import { connectrecipeDB, getallrecipe } from "../db/database.js";
import Mongoose from "mongoose";


// recipe-all 안의 모든 데이터를 받아오는 함수
export async function getAll() {
    try {
        await connectrecipeDB(); 

        const informationCollection = getallrecipe();

        const data = await informationCollection.find().toArray();
        return data;
    } catch (error) {
        console.error("Error querying information:", error);
        throw error; // Rethrow the error to be handled by the calling code
    } finally {
        Mongoose.connection.close();
    }
}