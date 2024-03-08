import React, { useEffect, useState } from "react";
import "./auth.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [selected, setSelected] = useState('teacher')

  const [username, setUsername] = useState("");
  const [nick, setNick] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const signUpHandler = async (e) => {
    e.preventDefault();
    if (!username || !nick) {
      toast.error("Fields are required");
    } else {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: username,
          nickname: nick,
          profileUrl: url,
        }),
      });
  
      const data = await response.json();
  
      console.log(data);
      if (data.message === "Error creating user") {
        toast.error("Please select a different User Id");
      } else {
        toast.success("User registered successfully. Please login to continue");
        setIsLogin(true);
        setEmail("");
        setConfirmPassword("");
      }
      setLoading(false)
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("All fields are required");
    } else {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/users/${username}`, {
        method: "GET", // Specify the method
        headers: {
          "Content-Type": "application/json", // Specify the content type in the headers
        },
      })
        .then((response) => {
          return response.json(); // Convert the response payload to JSON
        })
        .then((data) => {
          console.log(data);
          if (data.message == "Error retrieving user") {
            toast.error("User does not exists with this User Id");
          } else {
            localStorage.setItem("authId", username);
            navigate("/");
          }
          setLoading(false);
        });
    }
  };
  return (
    <div className="">
      <div className="pen-title"></div>
      <div className="module form-module">
        {isLogin ? (
          <div className="form">
            <h2>Login to your account</h2>
            <form>
              <input
                type="text"
                placeholder="User Id"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                onClick={loginHandler}
                className="fcenter"
              >
                {"Login"}
              </button>
            </form>
          </div>
        ) : (
          <div className="form">
            <div className="btn-group w-100 form-module2" role="group">
              <button className={`btn ${selected == 'student' ? 'button' : ""}`} onClick={()=>setSelected('teacher')}>
                Student
              </button>
              <button className={`btn ${selected == 'teacher' ? 'button' : ""}`} onClick={()=>setSelected('student')}>
                Teacher
              </button>
            </div>
            <h2 className="mt-4">Create an account</h2>
            <form>
              <input
                type="text"
                placeholder="User Id"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nick name"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
              />
              <input
                type="text"
                placeholder="Profile URL (Optional)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                onClick={signUpHandler}
                className="fcenter"
                disabled={loading}
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </form>
          </div>
        )}
        {isLogin ? (
          <div className="text-center">
            <p>Dont't have an account? No problem</p>
            <button onClick={() => setIsLogin(false)}>Register here</button>
          </div>
        ) : (
          <div className="text-center mb-5">
            <p>Have an account?</p>
            <button onClick={() => setIsLogin(true)}>Login here</button>
          </div>
        )}
        {/* <div className="cta">
          <a href="#">Forgot your password?</a>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
