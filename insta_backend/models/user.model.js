import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 15,
        minLength: 1,
        unique: true
    },
    fullname:{
        type: String,
        required: true,
        maxLength: 20,
        minLength: 1
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxLength: 200,
        minLength: 1
    },
    password: {
        type: String
    },
    profilepic:{
        type: String,
        required: true
    },
    refreshToken:{
        type:String
    }
}, {timestamps: true})




// hash password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10);
    next()
})



// login compaire password
userSchema.method.isPasswordCorrect = async function(password){
    console.log(password)
    return await bcrypt.compare(password, this.password)
}

// generate access token
userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username: this.username,
            email: this.email
        },
        "XLU5jTe3cVOCcQuP0mEhjqIFt4MzWg51HaPm4UXNl0U", {
            expiresIn: '1d'
        }
    )
}


// generate refresh token
userSchema.method.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    "CI6MTcyMDAxNTk0NCwiaWF0IjoxNzIwMDE1O", {
        expiresIn: '7d'
    }
)
}


export const userModel = model("user", userSchema)
