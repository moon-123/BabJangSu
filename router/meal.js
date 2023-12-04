
// // localhost:8080/babjangsu/:id
// // localhost:8080/babjangsu/:username
// // localhost:8080/babjangsu/:
// // localhost:8080/babjangsu


// import express from "express";
// import * as mealController from '../controller/meal.js';
// import { body } from 'express-validator';
// import { validate } from '../middleware/validator.js'
// import { isAuth } from "../middleware/auth.js";

// // todayMeals   => { 
// //                   "id": 1,
//                 //   "br": { "rice":"잡곡밥", "soup":"된장국", "side1":"반찬1", "side2":"반찬2" },
// //                   "lu": { "rice":"잡곡밥", "soup":"된장국", "side1":"반찬1", "side2":"반찬2" },
// //                   "di": { "rice":"잡곡밥", "soup":"된장국", "side1":"반찬1", "side2":"반찬2" },
// //                   "date": "2023-11-10"
// //                 }
// // DB에 저장

// // meals        => { "rice":"잡곡밥", "soup":"된장국", "side1":"반찬1", "side2":"반찬2" }
// // todayMeals   => 오늘의 식단 아점저

// // recipe       => 요리법 하나
// // assets       => 재료 전체 obj
// // asset        => 재료 하나
// // assetText    => 재료 설명
// // myBody       => { "sugar": mySugar, "blood": myBlood, "weight": myWeight }
// // mySugar      => 혈당
// // myBlood      => 혈압
// // myWeight     => 몸무게

// const router = express.Router();

// // 오늘의 식단 meal-display, meal-like-recipe, meal-like-detail-display

// // 각 레시피는 고유 id가 있음
// // meal-like-recipe 의 각 요리 저장버튼 누를 시 해당 recipe id 넘김
// // 해당하는 db에 저장, 이미 row가 존재하면 빈 column 채움.

// // 식단 출력하기
// // GET [ip]:[port]]/mael    ?username=[누구]
// //                          &when=[true]
// //                          &what=[어떤밥]
// // when => 아 or 점 or 저
// // what => 밥 or 국 or 반찬1 or 반찬2
// router.get('/', mealController.getOneDayMeals);

// // 식단 저장하기
// // POST [ip]:[port]]/mael   ?username=[누구]
// //                          &when=[true]
// //                          &what=[어떤밥]
// // when => 아 or 점 or 저
// // what => 밥 or 국 or 반찬1 or 반찬2
// router.post('/:id', mealController.saveMeal);



// export default router;
 
