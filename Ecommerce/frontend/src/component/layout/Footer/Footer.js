import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <h4>Download Out App</h4>
        <p>Download App from Andorid and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="midFooter">
        <h1>Laxman</h1>
        <p>High Quality is our first Priority</p>
        <p>CopyRigts 2023 &copy; LaxmanSingh</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <Link to="https://www.facebook.com/laxman.singh.399826/">
          <i className="fab fa-facebook">facebook</i>
        </Link>
        <Link to="https://www.instagram.com/laxman_singh_rajput/">
          <i className="fab fa-instagram">instagram</i>
        </Link>
        <Link to="https://www.youtube.com/channel/UCQ6ZMl9wQW2zLlqj9JQJX0w">
          <i className=" AiOutlineInstagram">youtube</i>
        </Link>
        </div>
    </footer>
  );
};

export default Footer;
