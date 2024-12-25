import {model, Schema} from 'mongoose';


const postSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    image:{
        type: String,
        required: true
    },
    des:{
        type: String,
        maxLength: 300
    }
},{timestamps: true})


export const postModel = model('post', postSchema)


