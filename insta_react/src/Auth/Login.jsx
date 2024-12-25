import loginImage from "../assets/images/login.png";
import instagram from "../assets/images/instagram.png";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const loginCredential = useRef({ username: null, password: null });
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const setValues = (propName, propValue) => {
    if (propValue.trim() !== "") {
      loginCredential.current[propName] = propValue;
    } else {
      loginCredential.current[propName] = null;
    }
  };

  const loginUser = async (event) => {
    event.preventDefault();
    // console.log(loginCredential.current)

    if (
      loginCredential.current.username === null ||
      loginCredential.current.password === null
    ) {
      toast.error("Username & password is required!");
      return;
    }

    // cheack credential email or username

    let userObj = {
      email: null,
      username: null,
      password: loginCredential.current.password,
    };

    let isEmail1 = loginCredential.current.username.includes("@");
    let isEmail2 = loginCredential.current.username.includes(".");

    if (isEmail1 && isEmail2) {
      userObj.email = loginCredential.current.username.toLowerCase();
    } else {
      userObj.username = loginCredential.current.username.toLowerCase();
    }

    // console.log(userObj)

    // Axios Method
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        userObj,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.status === 200) {

        toast.success("User login successfully");
        
        navigate("/home");
        sessionStorage.setItem("LoggedInUser", JSON.stringify(response.data));

        document.form.reset();

      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  console.log("hey")

  return (
    <>
      <section className="main login_section">
        <div className="container ">
          <div className="login_container">
            {/* left container */}
            <div className="left">
              <img src={loginImage} alt="Login Image" className="loginImage" />
            </div>

            {/* right container */}
            <div className="right">
              <div className="signin_form">
                <img src={instagram} alt="Instagram" className="insta_logo"/>
                <form name="form" className="form" id="form" value="#">
                  <input
                    type="text"
                    placeholder="Username or email"
                    onKeyUp={(e) => {
                      setValues("username", e.target.value);
                    }}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    onKeyUp={(e) => {
                      setValues("password", e.target.value);
                    }}
                  />

                  <button className="btn" 
                  onClick={(e)=>{
                    if(isButtonEnabled === true){
                      loginUser(e)
                    }
                    
                  }}
                  >
                    Log in
                  </button>
                </form>
                <p className="lineTxt">
                  <span>OR</span>
                </p>
                <div className="loginwithGoogle">
                  <button className="btn googleBtn">Log in with Google</button>
                  <p className="forgotpass">Forgot password?</p>
                </div>
                <div className="logInBox">
                  <p>
                    Don't have an account?
                    <Link className="auth-link" to="/registration">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
