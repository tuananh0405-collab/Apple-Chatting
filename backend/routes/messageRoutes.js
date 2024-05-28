import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getMessages,sendMessages } from '../controllers/messageControllers.js';

const router = express.Router();

router.get('/:id', authenticate, getMessages)
router.post('/send/:id', authenticate, sendMessages)

export default router