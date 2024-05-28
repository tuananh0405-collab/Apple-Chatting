import express from 'express';
import {authenticate} from '../middlewares/authMiddleware.js'
import { getAllUsers } from '../controllers/userControllers.js';
const router = express.Router();

router.get('/', authenticate, getAllUsers)

export default router