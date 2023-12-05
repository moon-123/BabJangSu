// 민주
import * as RecipeRepository from '../data/recipe.js'
import { getSocketIO } from '../connection/socket.js';

// 밥, 국, 반찬, 기타로 나누는 함수
export async function getByType(req,res){
    try {
        // 파람에 국, 밥, 반찬, 기타가 있다
        const categoryId = req.params.id;
        // console.log(categoryId);
        const filteredData = await filterDataByCategory(categoryId);
        res.status(200).json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '1.Internal Server Error' });
    }
}

// 레시피 이름만 받아오는 함수
export async function getRecipe(req, res) {
    try {
        const ingredientID = req.params.id;
        console.log(ingredientID);
        // 일단 모든 레시피 정보를 받아온다
        const data = await RecipeRepository.getAll();
        // 이후 레시피 하나만 뽑아 정보를 받아온다
        const oneEffect = data.filter((item) => item.RCP_NM.trim() == ingredientID);
        // console.log(oneEffect);
        // json으로 표출
        res.status(200).json(oneEffect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '2.Internal Server Error' });
    }
}

// 데이터베이스의 모든 데이터를 받아와서 대분류별로 분류하는 함수
export async function filterDataByCategory(categoryId) {
    const data = await RecipeRepository.getAll();
    return data.filter(item => item.RCP_PAT2 === categoryId);
}
