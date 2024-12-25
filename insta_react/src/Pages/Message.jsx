import { Link, useNavigate } from "react-router-dom";
import Navigation from "../SubComponents/Navigation";
import profilePic from "../assets/images/virat.jpg";
import { io } from 'socket.io-client'
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

const Message = () => {
  const loggedInData = JSON.parse(sessionStorage.getItem('LoggedInUser'));
  const loggedInUser = loggedInData?.result;
  const [chatMessages, allChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [allUserData, setAllUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null)
  const chatContainerRef = useRef(null);
  const navigate = useNavigate()


  useEffect(() => {
      const socketData = io("http://localhost:8000");
      setSocket(socketData)
  
      if(loggedInUser?._id){
        socketData.emit('addUser', loggedInUser?._id)
      }
  
      // return () =>{
      //   socketData.disconnect();
      // }
     
  }, []);
  

  useEffect(()=>{
    getAllUserData()
  },[])



  const sendNewMessage = () =>{
    if(socket){
      if(newMessage.trim() !== ""){
      
        let chatObj = {
          senderId:loggedInUser._id, 
          receiverId: selectedUser?._id,
          message: newMessage
        }

        console.log(chatObj)


        if(chatObj.senderId === undefined ||
          chatObj.receiverId === undefined
        ){
          console.error("Please select user");
          toast.success("Please select the user")
          return
        }

        socket.emit('sendMessage', chatObj)

        allChatMessages((pre)=>[
          ...pre,
          {
            senderId:loggedInUser._id, 
            receiverId: selectedUser?._id,
            message: newMessage,
            createdAt: Date.now()
          }
        ])

        setNewMessage("")
      }
    }
  }


  const getAllUserData = async () =>{
    try {
      const response = await axios.get("http://localhost:8000/api/user/getallusers",{
        headers: { 
          "Authorization":`Bearer ${loggedInData?.accessToken}`
         }
      });

      const updateDataIndex = response.data.result.findIndex((ele)=>(ele._id === loggedInData?.result?._id))

      response.data.result.splice(updateDataIndex, 1)

      setAllUserData(response.data.result)
    } catch (error) {
      console.log(error)
    }
  }
  

  // get all chats 
  const getAllChats = async(user) =>{
    try {
      const response = await axios.get(`http://localhost:8000/api/user/getchat/${user._id}/${loggedInUser._id}`,{
        headers: { 
          "Authorization":`Bearer ${loggedInData?.accessToken}`
         }
      })

      if(response.status === 200){
        allChatMessages(response?.data?.result)
      }
      setSelectedUser(user)

    } catch (error) {
      console.error(error)
    }
  }

  console.log(selectedUser)

  useEffect(()=>{
    console.log(selectedUser)
    if(socket){
      
      socket.on('receive-Message' ,(message)=>{

        if(message.senderId == selectedUser._id){
          allChatMessages((pre)=>[
            ...pre,
            {
              ...message,
              receiverId:loggedInUser._id,
              createdAt:Date.now()
            }
          ])
        }
      })
    }

    return()=>{
      socket?.off('receive-Message')
    }
  },[socket, selectedUser])


  const MessageTime = ({timeStamp}) =>{
    try {
      const formattedTime = format(new Date(timeStamp), 'h:mm a');
      return <span>{formattedTime}</span>
    } catch (error) {
      console.error(error)
      return <></>
    }
  }


  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  },[chatMessages])


  

  return (
    <>
      <main className="main homepage">
        <Navigation />
        <div className="main_container">
          <div className="msgLeft-section">
            <div className="links-icon">
              <i className="fa-solid fa-house"  onClick={()=>navigate("/home")}></i>
              <i className="fa-solid fa-magnifying-glass"></i>
              <i className="fa-solid fa-compass"></i>
              <i className="fa-brands fa-facebook-messenger"></i>
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-square-plus"></i>
              <i className="fa-solid fa-user"></i>
            </div>

            <div className="users-sec">
              <div className="user-id">
                <h3>
                  <Link to="/profile">{loggedInUser.username}</Link>
                </h3>
                <i className="fa-regular fa-pen-to-square"></i>
              </div>

              <div className="chatwith-user">

                {
                  allUserData?.map((user)=>(
                    <div className="user" key={user._id} onClick={()=>getAllChats(user)}>
                      <img src={user.profilepic} alt="" />
                      <div className="user__name">
                        <h3>{user.username}</h3>
                        <span>{user.description}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="msgRight-section">
            <div className="msg-container">
              <div className="userInfo">
              <div className="user">
                  <img src={selectedUser?.profilepic} alt="" />
                  <div className="user__name">
                    <h3>{selectedUser?.username}</h3>
                  </div>
                </div>
              </div>
              <div className="chat-container" ref={chatContainerRef}>

                {
                  chatMessages?.map((chat)=>(
                    <div className={chat.senderId === loggedInUser._id ? 'right-user-chat':null}>
                      <div className="user-chat">
                        {
                          chat.senderId !== loggedInUser._id?(
                            <div className="userName">A</div>
                          ):null
                        }
                        <p className="newMessage">{chat.message}</p>
                      </div>
                      <p className="chatTime">
                       <MessageTime timeStamp={chat.createdAt}/>
                      </p>
                    </div>
                  ))
                }
              </div>

              <div className="writeMsg">
                <input type="text" placeholder="Write Message..." id="Reply"
               value={newMessage}
               onChange={(e)=>setNewMessage(e.target.value)}
               onKeyDown={(e)=>{
                if(e.key === "Enter" && e.target.value.trim() !==""){
                  sendNewMessage()
                }
               }}
                />
                <i className="fa-solid fa-reply" onClick={sendNewMessage}></i>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Message;
