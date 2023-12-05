import express from "express";
import * as ingredientsController from '../controller/ingredient.js';

const router = express.Router();

router.get('/:id', ingredientsController.getCategory)
router.get('/detail/:id', ingredientsController.getOneEffect);

export default router;