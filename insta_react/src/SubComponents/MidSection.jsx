import profilePic from "../assets/images/virat.jpg";
import Kylie from "../assets/images/Kyliejenner.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const MidSection =()=>{
    const loggedInData = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    const [allPost, setAllPost] = useState([])

    //get all post data
    const getAllPost = async () =>{
      try {
        const response = await axios.get("http://localhost:8000/api/user/",{
          headers:{
            'Authorization':`Bearer ${loggedInData.accessToken}`       
          }
        });
        console.log(response)
        setAllPost(response.data.result)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(()=>{
      getAllPost()
    },[])

    return (
        <>
        
        <div className="mid-menu">
            <div className="stories">
              <div className="story">
                <img src={profilePic} alt="Story" />
                <h4>Your Story</h4>
              </div>
              <div className="story">
                <img src={profilePic} alt="Story" />
                <h4>Virat.Kohli</h4>
              </div>

              <div className="story">
                <img src={profilePic} alt="Story" />
                <h4>Virat.Kohli</h4>
              </div>
              <div className="story">
                <img src={profilePic} alt="Story" />
                <h4>Virat.Kohli</h4>
              </div>
              <div className="story">
                <img src={profilePic} alt="Story" />
                <h4>Virat.Kohli</h4>
              </div>
            </div>

            {/* -------post------- */}

            {
              allPost.map((post)=>(
                <div className="posts" key={post._id}>
                <div className="user_info" style={{borderBottom:"1px solid #e9e9e9"}}>
                  <div className="userid">
                    <img src={post.userId.profilepic} alt="Post" />
                    <h3>{post.userId.username}</h3>
                  </div>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
                <p style={{padding:"0px 15px", 
                  fontWeight:"600",
                  fontSize:"17px",
                  color:"#4f4f4f"
                }}>#{post.des}</p>
  
                <div className="post">
                  <img src={post.image} alt="" />
                </div>
  
                <div className="post-icons">
                  <div className="left-icons">
                    <i className="fa-regular fa-heart"></i>
                    <i className="fa-regular fa-comment"></i>
                    <i className="fa-regular fa-paper-plane"></i>
                  </div>
                  <div className="right-icons">
                    <i className="fa-regular fa-bookmark"></i>
                  </div>
                </div>
              </div>
              ))
            }

          </div>
        </>
    )
}

export default MidSection;