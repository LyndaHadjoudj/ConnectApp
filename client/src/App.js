import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./help/AuthContext";
import { useEffect } from "react";
import React, { useState } from 'react'
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
  // const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },

    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false })
      }
      else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        });

        console.log(`The data is ${response.data.username}`);
      }
    })
  }, [])
  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ ...authState, status: false });
    // navigate("/login")
  }
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className="App">
        <Router>
          <nav>
            <Link className="nav-elm" to={"/"}>Home Page</Link>
            <Link className="nav-elm" to={"/createpost"}>Create Post</Link>
            {!authState.status ? (
              <>
                <Link className="nav-elm" to={"/login"}>Login</Link>
                <Link className="nav-elm" to={"/registration"}>Registration</Link>
              </>
            ) : (
              <>
                <button onClick={logOut}>Log out</button>
                <h3>{authState.username}</h3>
              </>

            )}
            <Link to={"/post/:id"}></Link>

          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>

  );
}

export default App;