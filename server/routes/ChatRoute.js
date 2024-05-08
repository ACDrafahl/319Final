import express from 'express';
import { createChat, findChat, userChats, newChat } from '../controllers/ChatController.js';

const router = express.Router();

router.post('/', createChat);
router.post('/newChat', newChat); // Add route for newChat
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

export default router;