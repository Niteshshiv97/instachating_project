import { Schema, model } from "mongoose";

const followSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    following:{
        type: Schema.Types.ObjectId,
        ref:'user'
    }
}, {timestamps: true})

export const followModel = model("follow", followSchema)