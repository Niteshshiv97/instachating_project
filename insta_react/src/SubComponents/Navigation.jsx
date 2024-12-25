import { useEffect, useState } from "react";
import logo from "../assets/images/instagram.png";
import profilePic from "../assets/images/virat.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navigation =()=>{
  const loggedInData = JSON.parse(sessionStorage.getItem('LoggedInUser'));
  const [isModalOpne, setIsModalOpen] = useState(false);
  const [postData, setPostData] = useState({des:null, image:null});
  const [allUserData, setAllUserData] = useState([])
  const [filterData, setFilterData] = useState([])
  const navigate = useNavigate()
  const [searchUser, setSearchUser] = useState(false)
  const [followList, setFollowList] = useState({followers:[], followings:[]});


  // upload post api integration
  const uploadPost = async (e) =>{
    e.preventDefault()

    const formdata = new FormData();
    formdata.append('des', postData.des);
    formdata.append('image', postData.image);


    try {
      const response = await axios.post("http://localhost:8000/api/user/post", 
        formdata, 
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization":`Bearer ${loggedInData?.accessToken}`
           }
        }
      )

      console.log(response)

      if(response.data.status === 201){
        toast.success("Post Uploaded successfully.")
        setIsModalOpen(false)
        navigate("/home")
      }

    } catch (error) {
      toast.error("Server Error")
    }
  }

  // get all users api integration
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
      setFilterData(response.data.result)
    } catch (error) {
      console.log(error)
    }
  }

  // user search integration
  const setSearchData = (searchValue) =>{
    if(searchValue.trim() === ""){
      setSearchUser(false)
    }else{
      setSearchUser(true)
      console.log(allUserData)

      let newfilterData = allUserData.filter((ele)=>(
        ele.username.toLowerCase().includes(searchValue.toLowerCase())
      ))
      setFilterData(newfilterData)

    }
  }

  // follow user api integration
  const followNewUser = async (user) =>{
    try {
      const response = await axios.post(`http://localhost:8000/api/user/following/${user._id}`,
        null,
        {
        headers: { 
          "Authorization":`Bearer ${loggedInData?.accessToken}`
         }
      })
      console.log(response)
      if(response.data.status== 201){
        toast.success(`Started following to ${user.username}`)
        setSearchUser(false)
        getFollowList()
      }
    } catch (error) {
      console.error(error)
    }
  }

  // get follow list api integration
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


  console.log(followList)

  useEffect(()=>{
    getAllUserData()
    getFollowList()
  },[])
    return(
        <>
        <header className="header">
          <div className="left-header">
            <div className="insta-logo">
              <img src={logo} alt="Instagram" />
            </div>
            <div className="search">
              <input type="search" placeholder="search" 
              onKeyUp={(e)=>setSearchData(e.target.value)}
              />
              {
                searchUser?(
                  <div className="searchPart">
                  {
                    filterData.map((user)=>{
                      
                      const isFollowing = followList.followings.some((followuser)=>followuser.follower._id === user._id)

                      return(
                        <div className="serachUser">
                          <div className="userid">
                            <img src={user.profilepic} alt="" />
                          </div>
                          <p>{user.username}</p>
                          {
                            isFollowing?(
                              <button className="btn"
                              style={{backgroundColor:"grey"}}
                              disabled
                              >Following</button>
                            ):(
                              <button className="btn"
                              onClick={()=>followNewUser(user)}
                              >Follow</button>
                            )
                          }
                        </div>
                          
                      )
                    }
                  )
                  }
                    
                 </div>
                ):null
              }
             
            </div>
          </div>

          <div className="mid-header">
            <i className="fa-solid fa-house" onClick={()=>navigate("/home")}></i>
            <i className="fa-solid fa-film" onClick={()=>navigate("/home")}></i>
            <i className="fa-solid fa-compass"></i>
          </div>

          <div className="right-header">
            <img src={profilePic} alt="profile" className="profileImage" />
            <i className="fa-solid fa-square-plus"
            onClick={()=>{
              setIsModalOpen(true)
            }}
            ></i>
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-bookmark"></i>
          </div>
        </header>

        {
          isModalOpne?(
            <div className="modal">
                <div className="modal-container">
                    <i className="fa-regular fa-rectangle-xmark closeIcon"
                    onClick={()=>{
                      setIsModalOpen(false)
                    }}
                    ></i>
                      <h2>Add New Post</h2>
                    <form name="form" className="form" id="form" value="#">
                    <label>Add Description</label>
                      <input
                        type="text"
                        placeholder="Enter Description"
                        onKeyUp={(e)=>{
                          setPostData({...postData, des:e.target.value})
                        }}
                      />

                      <label>Add Photo</label>
                      <input
                        type="file"
                        placeholder="Password"
                        onChange={(e)=>{
                          setPostData({...postData, image:e.target.files[0]})
                        }}
                      />

                      <button className="btn" onClick={uploadPost}>
                        Post
                      </button>
                    </form>
                </div>
            </div>
          ):null
        }
        
        </>
    )
}

export default Navigation