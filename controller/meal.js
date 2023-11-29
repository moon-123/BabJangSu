import * as mealRepository from '../data/meal.js';

// Fetch OpenAPI -> 식단 계산 후 res json, 레시피 하나 res json, 
// data/meal.js 에서 fetch

// 하루치 모든 식단
export async function getOneDayMeals(req, res){
// req.query.username 등등 필요하면 추가

    makeMealTable()

}

// 아침 점심 저녁 식단 중 하나
export async function getMeal(req, res){
// req.query.username 등등 필요하면 추가

}

export async function saveMeal(req, res){

}

export async function deleteMeal(req, res){

}

// 식단 계산 함수
function makeMealTable(){

}


// Slack에 req, res 객체 참고 링크와 에러코드 참고 링크 있음
// 수정 최소화하게 에러 status 부분 신경써서 작성해주세요.