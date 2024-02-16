import exporess from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getNotifications, updateNotification } from "../controllers/notificationController";

const notificationRouter = exporess.Router();

notificationRouter.get(
    "/get-all-notifications",
    isAuthenticated,
    authorizeRoles('admin'),
    getNotifications

)
notificationRouter.put(
    "/update-notification/:id",
    isAuthenticated,
    authorizeRoles('admin'),
    updateNotification
)


export default notificationRouter;
