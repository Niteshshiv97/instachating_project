import express from 'express'; 
import cors from 'cors'
import connectDB from './db.js'
import http from 'http';
import { Server } from 'socket.io'
import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import { chatModel } from './models/chat.model.js';

const app = express()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

connectDB()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use("/api/user", userRouter)


const user = new Map();


//socket connection setup
io.on('connection', (socket)=>{
    console.log("A user connected");

    socket.on('addUser', (userId)=>{
        user.set(userId, socket.id)
    })

    socket.on('sendMessage', async({senderId, receiverId, message})=>{
        console.log(senderId, receiverId, message)
        const chat = new chatModel({senderId, receiverId, message})
        chat.save();
        

        const receiverSocketId = user.get(receiverId)
        if(receiverSocketId){
            socket.to(receiverSocketId).emit('receive-Message', {senderId, message})
        }

            


        socket.on('disconnect', ()=>{
            console.log("User disconnected.")

            user.forEach((value, key)=>{
                if(value === socket.id){
                    user.delete(key)
                }
            })
        })
    })


})




server.listen(8000 , ()=>{
    console.log("SERVER IS UP AND RUNNING...")
})