import React, { useRef } from "react";
import "./LoginSignUp.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const LoginSignUp = () => {
  const loginTab = useRef(null); //to access the
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { userName, email, password } = user;
  const [avatar, setAvatar] = useState("../.././images/profile.png");
  const [avatarPrview, setAvatarPrview] = useState("../.././images/profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData(); // it is used to send the data to the backend
    myForm.set("name", userName);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    console.log("Sign UP form Submit");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          //it has total 4 state and 2 is the ready state
          setAvatarPrview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <div>
      <>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login-signUp-toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <FaLock />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="login" className="loginBtn" />
            </form>

            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <CgProfile />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={userName}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="singUpPassword">
                <FaLock />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div id="registerImage">
                <img src={avatarPrview} alt="Avater Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="signUpBtn"
              />
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default LoginSignUp;
