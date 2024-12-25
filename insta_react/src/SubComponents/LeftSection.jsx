import { Link } from "react-router-dom";


const LeftSection = () => {
  return (
    <>
      <div className="left-menu">
        <div className="top-menu">
          <div className="category">
            <i className="fa-solid fa-house"></i>
            <Link to="/home" className="link">
              <h2>Home</h2>
            </Link>
          </div>
          <div className="category">
            <i className="fa-solid fa-magnifying-glass"></i>
            <Link to="/home" className="link">
              <h2>Search</h2>
            </Link>
          </div>

          <div className="category">
            <i className="fa-solid fa-compass"></i>
            <Link to="/home" className="link">
              <h2>Explore</h2>
            </Link>
          </div>
          <div className="category">
            <i className="fa-brands fa-facebook-messenger"></i>
            <Link to="/message" className="link">
              <h2>Message</h2>
            </Link>
          </div>
          <div className="category">
            <i className="fa-solid fa-heart"></i>
            <Link to="/home" className="link">
              <h2>Notifications</h2>
            </Link>
          </div>
          <div className="category">
            <i className="fa-solid fa-square-plus"></i>
            <Link to="/home" className="link">
              <h2>Create</h2>
            </Link>
          </div>
          <div className="category">
            <i className="fa-solid fa-user"></i>
            <Link to="/profile" className="link">
              <h2>Profile</h2>
            </Link>
          </div>
        </div>
        <div className="bottom-menu">
          <div className="category">
            <i className="fa-solid fa-bars"></i>
            <h2>More</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSection;
