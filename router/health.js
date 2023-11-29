import express from "express";
import * as healthController from '../controller/health.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js'
import { isAuth } from "../middleware/auth.js";


const router = express.Router();

// /health
// 뭐가 더 좋은지. 나중에 알아보자.
// health/createSugar/:id
// health/createBlood/:id
// health/createWeight/:id

// GET / health/:id?type=sugar
// GET / health/:id?type=blood
// GET / health/:id?type=weight

router.get('/:id', isAuth, healthController.getByType);


// GET with date
// 예시) health/:id?type=sugar&date=2023-11-13
// Query string: date
router.get('/:id', isAuth, healthController.getByTypeAndDate);

// router.get('/:id', isAuth, healthController.getBlood);
// router.get('/:id', isAuth, healthController.getWeight);
 
// POST / health
router.post('/createSugar/:id', isAuth, healthController.createSugar);
router.post('/createBlood/:id', isAuth, healthController.createBlood);
router.post('/createWeight/:id', isAuth, healthController.createWeight);



export default router;
 
