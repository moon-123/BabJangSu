import mongoose from 'mongoose';
import * as healthdata from '../db/database.js'


export async function fetch_data() {
    try {
        const response = await fetch('http://211.237.50.150:7080/openapi/7d0f4e0303ecf3dc40527b620af70594287bbf951a99fec3463ae977515b7750/json/Grid_20171128000000000572_1/1/500');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const HealthInfoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: String,
    content: String
  });

const healthInfo = mongoose.model('healthInfo', HealthInfoSchema);


export async function getInfo() {
    try {
        await healthdata.connectDB();
        const data = await healthInfo.find().exec();
        // console.log(data)
        return data
    } catch (error) {
        console.error('Error in getAll:', error);
        throw error;
    }
}