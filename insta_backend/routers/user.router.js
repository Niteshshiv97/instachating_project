import express from 'express';
import { post, deletePost, getPost,
    following, followList, getAllUsers, getSingleUser,
    getCurrentUserPost, getAllChats
 } from '../controllers/user.controller.js';
import { varifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router()

router.post("/post",
    varifyJWT, 
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),
    post)

// delete post
router.delete("/delete/:id", varifyJWT, deletePost)    

// router to get all the posts
router.get("/", varifyJWT, getPost)

router.get("/currentuser", varifyJWT, getCurrentUserPost)



// followings
router.post("/following/:id", varifyJWT, following)


router.get("/followlist", varifyJWT,  followList)

router.get("/getallusers", varifyJWT, getAllUsers)

router.get("/getsingleuser/:id", varifyJWT, getSingleUser)

router.get("/getchat/:userId1/:userId2", varifyJWT, getAllChats)



export default router;