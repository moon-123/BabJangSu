import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { config } from './config.js';

// router
import mealRouter from './router/meal.js';
// import healthRouter from './router/health.js';
import recipeRouter from './router/recipe.js';
import ingredientRouter from './router/ingredient.js';
import authRouter from './router/auth.js';
// import dotenv from 'dotenv';

// db
import { connectDB, connectsaveDB, connectrecipeDB } from './db/database.js';


const app = express();


// 미들웨어
app.use(express.json());
app.use(morgan("dev")); 
app.use(cors());

// 라우터
app.use('/auth', authRouter);
// app.use('/health', healthRouter);
app.use('/ingredient', ingredientRouter);
app.use('/meal', mealRouter);
app.use('/recipe', recipeRouter);


app.use((req, res, next) => {
    res.sendStatus(404);
});

// connectDB().then(() => {
//     app.listen(config.host.port);    // config.[].[] 로 config에 정의한 값에 접근할 수 있음.

// }).catch(console.error)


Promise.all([connectDB('recipe'), connectDB('bob'), connectDB('healthInfomation')]) 
    .then(() => {
        const server = app.listen(config.host.port);
        console.log("Server started successfully");
    })
    .catch(console.error);


// Promise.all([connectsaveDB(), connectrecipeDB(), connectDB('recipe'), connectDB('bob')])
//     .then(() => {
//         const server = app.listen(config.host.port);
//         console.log("Server started successfully");
//     })
//     .catch(console.error);