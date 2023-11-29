import express from "express";
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// validation



// router.get('/', authController.getUsers);
router.post('/signup');
router.post('/login');

router.get('/me', isAuth, authController.me);

export default router;