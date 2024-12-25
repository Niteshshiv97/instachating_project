import Registration from "./Auth/Registration";
import Login from "./Auth/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Message from "./Pages/Message";

function App() {

  
const PrivateRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem("LoggedInUser");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

  const ProtectedRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/profile", element: <Profile /> },
    {path: "/message", element : <Message/>}
  ];

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          {
          ProtectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={<PrivateRoute element={element}/>} />
          ))
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
