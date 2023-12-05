// 하나로통일할거면 이거 connectDB로 변경
// 민주
import { connectsaveDB,getuserecipe } from "../db/database.js";
import Mongoose from "mongoose";
import { getAll } from "./recipe.js";


// 저장할 레시피 테이블 형식
const foodSchema = new Mongoose.Schema({
    userid:String,
    RCP_PARTS_DTLS: String,
    RCP_WAY2: String,
    RCP_SEQ: String,
    INFO_NA: String,
    INFO_WGT: String,
    INFO_PRO: String,
    INFO_FAT: String,
    HASH_TAG: String,
    RCP_PAT2: String,
    RCP_NA_TIP: String,
    INFO_ENG: String,
    RCP_NM: String,
    MANUAL01: String,
    MANUAL02: String,
    MANUAL03: String,
    MANUAL04: String,
    MANUAL05: String,
    MANUAL06: String,
    MANUAL07: String,
    MANUAL08: String,
    MANUAL09: String,
    MANUAL10: String,
    MANUAL11: String,
    MANUAL12: String,
    MANUAL13: String,
    MANUAL14: String,
    MANUAL15: String,
    MANUAL16: String,
    MANUAL17: String,
    MANUAL18: String,
    MANUAL19: String,
    MANUAL20: String,
    MANUAL_IMG01: String,
    MANUAL_IMG02: String,
    MANUAL_IMG03: String,
    MANUAL_IMG04: String,
    MANUAL_IMG05: String,
    MANUAL_IMG06: String,
    MANUAL_IMG07: String,
    MANUAL_IMG08: String,
    MANUAL_IMG09: String,
    MANUAL_IMG10: String,
    MANUAL_IMG11: String,
    MANUAL_IMG12: String,
    MANUAL_IMG13: String,
    MANUAL_IMG14: String,
    MANUAL_IMG15: String,
    MANUAL_IMG16: String,
    MANUAL_IMG17: String,
    MANUAL_IMG18: String,
    MANUAL_IMG19: String,
    MANUAL_IMG20: String,
    ATT_FILE_NO_MK: String,
    ATT_FILE_NO_MAIN: String,
});

// user_recipe에 넣는다
const Recipes = Mongoose.model('user_recipe', foodSchema);


// 위의 Recipes의 테이블 중 하나인 userid를 받아와서 해당 아이디가 존재하는 데이터만 뽑는 함수. 내 레시피 보기 기능에 쓰는 함수
export async function getByUserid(userid) {
    try {
        // bob에 연결
        await connectsaveDB();
        // user_recipes 컬렉션에 연결
        const informationCollection = getuserecipe();
        // 거기서 userid:userid인 데이터 찾는 방법
        const data = await informationCollection.find({ userid }).toArray();
        // console.log(data)
        return data;
    } catch (error) {
        console.error("Error querying information:", error);
        throw error;
    } finally {
        Mongoose.connection.close();
    }
}


// 레시피 저장 함수
export async function saveData(userid,RCP_PARTS_DTLS,RCP_WAY2,RCP_SEQ,INFO_NA,INFO_WGT,
    INFO_PRO,INFO_FAT,HASH_TAG,RCP_PAT2,RCP_NA_TIP,INFO_ENG,RCP_NM,MANUAL01,MANUAL02,MANUAL03,MANUAL04,MANUAL05,MANUAL06,MANUAL07,MANUAL08,MANUAL09,MANUAL10,MANUAL11,MANUAL12,MANUAL13,MANUAL14,MANUAL15,MANUAL16,MANUAL17,MANUAL18,MANUAL19,MANUAL20,MANUAL_IMG01,MANUAL_IMG02,MANUAL_IMG03,MANUAL_IMG04,MANUAL_IMG05,MANUAL_IMG06,MANUAL_IMG07,MANUAL_IMG08,MANUAL_IMG09,MANUAL_IMG10,MANUAL_IMG11,MANUAL_IMG12,MANUAL_IMG13,MANUAL_IMG14,MANUAL_IMG15,MANUAL_IMG16,MANUAL_IMG17,MANUAL_IMG18,MANUAL_IMG19,MANUAL_IMG20,ATT_FILE_NO_MK,ATT_FILE_NO_MAIN) {
        try {
            // 이것을 connectDB로 바꿔도 될 듯 합니다
            await connectsaveDB();
            const newRecipe = new Recipes({
                userid,
                RCP_PARTS_DTLS,
                RCP_WAY2,
                RCP_SEQ,
                INFO_NA,
                INFO_WGT,
                INFO_PRO,
                INFO_FAT,
                HASH_TAG,
                RCP_PAT2,
                RCP_NA_TIP,
                INFO_ENG,
                RCP_NM,
                MANUAL01,
                MANUAL02,
                MANUAL03, 
                MANUAL04,
                MANUAL05,
                MANUAL06,
                MANUAL07,
                MANUAL08,
                MANUAL09,
                MANUAL10,
                MANUAL11,
                MANUAL12,
                MANUAL13,
                MANUAL14,
                MANUAL15,
                MANUAL16,
                MANUAL17,
                MANUAL18,
                MANUAL19,
                MANUAL20,
                MANUAL_IMG01,
                MANUAL_IMG02,
                MANUAL_IMG03,
                MANUAL_IMG04,
                MANUAL_IMG05,
                MANUAL_IMG06,
                MANUAL_IMG07,
                MANUAL_IMG08,
                MANUAL_IMG09,
                MANUAL_IMG10,
                MANUAL_IMG11,
                MANUAL_IMG12,
                MANUAL_IMG13,
                MANUAL_IMG14,
                MANUAL_IMG15,
                MANUAL_IMG16,
                MANUAL_IMG17,
                MANUAL_IMG18,
                MANUAL_IMG19,
                MANUAL_IMG20,
                ATT_FILE_NO_MK,
                ATT_FILE_NO_MAIN,
            });
    
            await newRecipe.save();
    
        } catch (error) {
            console.error('Error saving data:', error.message);
            throw error;
        } finally {
            Mongoose.connection.close();
        }
}

// 저장된 레시피를 삭제하는 함수. userid와 레시피 이름을 받아와서 두 개가 겹치는 데이터를 삭제
export async function deleteData(id,rcpname) {
    try {
        // 얘도 connectDB로 바꿀거라면 다 바꿨는지 check
        await connectsaveDB();
        await Recipes.deleteOne({ RCP_NM: rcpname, userid: id });
    } catch (error) {
        console.error('Error deleting data:', error.message);
        throw error;
    }
}

