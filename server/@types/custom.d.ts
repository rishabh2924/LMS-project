import { Request } from "express";
import { IUser } from "../models/userModal";

declare global{
    namespace Express{
        interface Request{
            user?:IUser
        }
    }
    /**
     * Extends the Express Request interface by adding an optional 'user' property of type IUser.
     * This allows for the user information to be attached to the request object, which can be
     * used in subsequent middleware or route handlers to access user-specific data.
     */
}