import { useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import instagram from "../assets/images/instagram.png";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const userData = useRef({
    username: null,
    fullname: null,
    email: null,
    password: null,
    description: null,
  });
  const [profilePic, setProfilePic] = useState(null);

  // for set value's for userData
  const setValues = (propName, propValue) => {
    if (propValue.trim() !== "") {
      userData.current[propName] = propValue;
    } else {
      userData.current[propName] = null;
    }
  };

  // final submit Function

  const submitData = async (event) => {
    event.preventDefault();
    // console.log(userData.current);
    // alert("Login Successfully")

    if (
      userData.current.username === null ||
      userData.current.email === null ||
      userData.current.fullname === null ||
      userData.current.password === null ||
      profilePic === null
    ) {
      toast.error("Please fill the required feilds");
      return;
    }

    // create form object
    const formData = new FormData();

    formData.append("username", userData.current.username);
    formData.append("fullname", userData.current.fullname);
    formData.append("email", userData.current.email);
    formData.append("password", userData.current.password);
    formData.append("description", userData.current.description);
    formData.append("profilepic", profilePic);

    // Axios Method

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // console.log(response.data)

      if (response.data.status === 201) {
        navigate("/login");
        document.form.reset();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // fetch("http://localhost:8000/api/auth/register", {
    //   method: "POST",
    //   body: formData,
    //   // headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="signup_container">
            <div className="signup_form">
              <div className="logo">
                <img
                  src={instagram}
                  alt="Instagram Logo"
                  className="insta_logo"
                />
              </div>
              <p className="para">
                Sign up to see photos and videos from your friends.
              </p>

              <div className="signup_btns">
                <button className="btn googleBtn">Log in with Google</button>
                <button className="btn facebookBtn">
                  Log in with Facebook
                </button>
              </div>

              <p className="lineTxt">
                <span>OR</span>
              </p>

              {/* form inputs */}
              <form name="form" className="form" id="form" value="#">
                <input
                  type="text"
                  placeholder="Username"
                  onKeyUp={(e) => {
                    setValues("username", e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  onKeyUp={(e) => {
                    setValues("fullname", e.target.value);
                  }}
                />

                <input
                  type="email"
                  placeholder="Enter Email"
                  onKeyUp={(e) => {
                    setValues("email", e.target.value);
                  }}
                />

                <input
                  type="password"
                  placeholder="Enter Password"
                  onKeyUp={(e) => {
                    setValues("password", e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Description.."
                  onKeyUp={(e) => {
                    setValues("description", e.target.value);
                  }}
                />
                <input
                  type="file"
                  name="profilepic"
                  id="profileImg"
                  onChange={(e) => {
                    setProfilePic(e.target.files[0]);
                  }}
                />
                <div>
                  <p className="p1">
                    People who use our service may have uploaded your contact
                    information to Instagram. Learn More
                  </p>
                  <p className="p1">
                    By signing up, you agree to our Terms , Privacy Policy and
                    Cookies Policy .
                  </p>
                </div>

                <button className="btn submitBtn" onClick={submitData}>
                  Sign up
                </button>
              </form>
              <div className="logInBox">
                <p>
                  Have an account?{" "}
                  <Link className="auth-link" to="/login">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
