import express from 'express'
import { activateUser, getUserInfo, loginUser, logoutUser, registerationUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from '../controllers/userController'
import { isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/registration',registerationUser)
userRouter.post('/activate-user',activateUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',isAuthenticated,logoutUser)

userRouter.post('/social-auth',socialAuth)

userRouter.get('/refresh',updateAccessToken)

userRouter.get('/info',isAuthenticated,getUserInfo)

userRouter.put('/update-user-info',isAuthenticated,updateUserInfo)

userRouter.put('/update-password',isAuthenticated,updatePassword)

userRouter.put('/update-user-avatar',isAuthenticated,updateAvatar)

export default userRouter;