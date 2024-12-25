import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    receiverId:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    message:{
        type:String,
        required: true
    }
},{timestamps:true})



export const chatModel = model('chat', chatSchema)