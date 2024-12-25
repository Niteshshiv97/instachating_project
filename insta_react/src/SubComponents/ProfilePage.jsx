import axios from "axios";
import profilePic from "../assets/images/virat.jpg";
import { useState, useEffect } from "react";

const ProfilePage = () => {

  const loggedInData = JSON.parse(sessionStorage.getItem('LoggedInUser'));
  const loggedInUser = loggedInData?.result;
  const [followList, setFollowList] = useState({followers:[], followings:[]});
  const [currentUserPost, setCurrentUserPost] = useState([])

  const getFollowList = async () =>{
    try {
      
      const response = await axios.get("http://localhost:8000/api/user/followlist",{
        headers:{
          'Authorization':`Bearer ${loggedInData.accessToken}`       
        }
      })
      setFollowList(response.data.result)
    } catch (error) {
      console.error(error)
    }
  }

  // get current user posts
  const getPost = async () =>{
    try {
      const response = await axios.get("http://localhost:8000/api/user/currentuser",{
        headers:{
          'Authorization':`Bearer ${loggedInData.accessToken}`       
        }
      })
      console.log(response)
      setCurrentUserPost(response.data.result)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(()=>{
    getFollowList()
    getPost()
  },[])

  console.log(currentUserPost)

  return (
    <>
      <div className="profile-section">
        <div className="profile-container">
          <div className="flex-1">
            <div className="user-img">
              <img src={loggedInUser.profilepic} alt="" />
            </div>

            <div className="user-information">
              <div className="user-box">
                <h3>{loggedInUser.fullname}</h3>
                <button className="btn">Edit profile</button>
                <i className="fa-solid fa-gear"></i>
              </div>

              <div className="followers-info">
                <p>
                  <div>{currentUserPost.length}</div> Posts
                </p>
                <p>
                  <div>{followList.followers.length}</div> Followers
                </p>
                <p>
                  <div>{followList.followings.length}</div> Following
                </p>
              </div>

              <div className="user-desc">
                <p>{loggedInUser.description}</p>
                {/* <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet consectetur.</p> */}
              </div>
            </div>
          </div>

          <div className="flex-2">
            <div className="highlights">
              <img src={profilePic} alt="" />
              Hightlight
            </div>
            <div className="highlights">
              <img src={profilePic} alt="" />
              Hightlight
            </div>
            <div className="highlights">
              <img src={profilePic} alt="" />
              Hightlight
            </div>
            <div className="highlights">
              <img src={profilePic} alt="" />
              Hightlight
            </div>
            <div className="highlights">
              <img src={profilePic} alt="" />
              Hightlight
            </div>
            <div className="highlights">
              <img src={profilePic} alt="" />
              Hightlight
            </div>
          </div>

          <div className="flex-3">
            <div className="categories">
              <i className="fa-solid fa-border-all"> POSTS</i>
              <i className="fa-solid fa-film"> REELS</i>
              <i className="fa-regular fa-bookmark"> SAVED</i>
              <i className="fa-regular fa-circle-user"> TAGGED</i>
            </div>

            <div className="user-posts">
                {
                  currentUserPost.map((post)=>(
                    <div className="box" key={post._id}>
                      <img src={post.image} alt="" />
                    </div>
                  ))
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
