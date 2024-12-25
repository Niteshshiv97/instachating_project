import express from "express";
const router = express.Router();
import { registerUser, login, logout } from '../controllers/auth.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { varifyJWT } from "../middlewares/auth.middleware.js";

// user registration
router.post("/register",
    upload.fields([
        {
            name: 'profilepic',
            maxCount: 1
        }
    ]),
    registerUser)


// router for login

router.post("/login", login)


router.post("/logout", varifyJWT, logout)


export default router;