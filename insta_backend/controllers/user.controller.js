import { postModel } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { followModel } from "../models/follow.model.js";
import { userModel } from "../models/user.model.js";
import { chatModel } from "../models/chat.model.js";


export const post = async(req, res) =>{
   try {
    let { des } = req.body;
    
    const postPicPath = req.files?.image[0].path;

    const postpic = await uploadOnCloudinary(postPicPath);

    const post = await postModel.create({
        userId: req.user._id,
        image: postpic?.url,
        des: des
    })

    return res.status(201)
    .json({status:201, resutl: post, message:"Post created successfully."})

   } catch (error) {
    return res.status(500)
    .json({message:"Server post Error"})
   }
}


export const deletePost = async(req, res) =>{
  try {
    const postId = req.params.id;
    await postModel.findByIdAndDelete(postId)
    return res.status(200)
    .json({message:"Post Deleted Successfully"})
  } catch (error) {
    return res.status(500)
    .json({message:"Server Error"})
  }
}


export const getPost = async(req, res) =>{
  try {
    const response = await postModel.find().populate('userId').sort({_id:-1});
    return res.status(200)
    .json({result:response, message:"Fetched all post" })
  } catch (error) {
    return res.status(500)
    .json({message:"Server Error"})
  }
}

export const following = async(req, res) =>{
  try {
    
    const {id} = req.params;

    const follow = new followModel({
      follower:id,
      following: req.user._id
    })

    await follow.save()

    return res.status(201)
    .json({status:201, result: follow, message:"Followed"})


  } catch (error) {
    return res.status(500)
    .json({message:"Server Error"})
  }
}


export const followList = async(req, res)=>{
  try {
    
    const followings = await followModel.find({
      following: req.user._id
    }).populate('follower')

    const followers = await followModel.find({
      follower: req.user._id
    }).populate('following')

    return res.status(200)
    .json({result: {followings, followers}, message:"Successfully Received"})
  } catch (error) {
    return res.status(500)
    .json({message:"Server Error"})
  }
}


export const getAllUsers = async(req, res) =>{
  try {

    const response = await userModel.find();
    return res.status(200)
    .json({result: response, message:"All user fetched."})
    
  } catch (error) {
    return res.status(500)
    .json({message:"Server Error"})
  }
}

export const getSingleUser = async(req, res) =>{
  try {
    const response = await userModel.findById(req.params.id)
    return res.status(200)
    .json({result: response, message:"Single user fetched."})
  } catch (error) {
    return res.status(500)
    .json({})
  }
}

export const getCurrentUserPost = async(req, res) =>{
  try {
    const response = await postModel.find({userId:req.user._id}).sort({_id:-1});
    return res.status(200)
    .json({status:200, result:response, message:"Fetched Current User post" })
  } catch (error) {
    return res.status(500)
    .json({})
  }
}


export const getAllChats = async(req, res) =>{
  try {
    const { userId1, userId2 } = req.params;

    const messages = await chatModel.find({
      $or: [
        { senderId:userId1, receiverId:userId2 },
        { senderId:userId2, receiverId:userId1 }
      ]
    })

    res.status(200).json({status:200, result: messages})

  } catch (error) {
    res.status(500).json({status:500, message:"Server Error"})
  }
}