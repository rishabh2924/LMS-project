import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerationUser,
  socialAuth,
  updateAccessToken,
  updateAvatar,
  updatePassword,
  updateUserInfo,
  updateUserRole,
} from "../controllers/userController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registerationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.post("/social-auth", socialAuth);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/info", isAuthenticated, getUserInfo);

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

userRouter.put("/update-password", isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar", isAuthenticated, updateAvatar);
userRouter.get(
  "/get-all-user",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
