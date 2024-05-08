import express from 'express'
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser, getUserByPhoneNumber } from '../controllers/UserController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router()

router.get('/:id', getUser);
router.get('/',getAllUsers)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/delete/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare, followUser)
router.put('/:id/unfollow',authMiddleWare, unfollowUser)
router.get('/getUserByPhoneNumber/:phoneNumber', getUserByPhoneNumber)

export default router