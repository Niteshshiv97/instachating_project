import profilePic from "../assets/images/virat.jpg";


const RightSection =()=>{
    return(
        <>
        
        <div className="right-menu">
            <div className="f-between">
              <div className="userid">
                <img src={profilePic} alt="Post" />
                <h3>Virat.Kohli</h3>
              </div>
              <p className="switch">Switch</p>
            </div>
            <div className="f-between">
              <span>Suggestion For You</span>
              <span>See All</span>
            </div>
            <div className="f-between">
              <div className="userid">
                <img src={profilePic} alt="Post" />
                <h3>Himanshu45</h3>
              </div>
              <p className="switch">Follow</p>
            </div>
            <div className="f-between">
              <div className="userid">
                <img src={profilePic} alt="Post" />
                <h3>Rohit Sharma</h3>
              </div>
              <p className="switch">Follow</p>
            </div>{" "}
            <div className="f-between">
              <div className="userid">
                <img src={profilePic} alt="Post" />
                <h3>Yebook.in</h3>
              </div>
              <p className="switch">Follow</p>
            </div>
          </div>
        </>
    )
}


export default RightSection;