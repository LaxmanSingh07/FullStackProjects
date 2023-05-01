import React from 'react'
import './Footer.scss'
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter, AiOutlineYoutube, AiOutlineMail } from 'react-icons/ai'
function Footer() {
  return (
    <div className='Footer'>
      <div className=" content container">
        <div className="footer-left">
          <h3 className='title'>Follow us</h3>
          <ul className="follow">
            <li className="hover-link">
              <AiOutlineInstagram/>
            </li>
            <li className="hover-link">
              <AiOutlineFacebook/>
            </li>
            <li className="hover-link">
              <AiOutlineTwitter/>
            </li>
            <li className="hover-link">
              <AiOutlineYoutube/>
            </li>

            <li className='hover-link'>
              <AiOutlineMail/>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h2 className='title'>Company</h2>
          <ul className="company">
            <li className="hover-link">About Us</li>
            <li className="hover-link">Contact Us</li>
            <li className="hover-link">Terms & Conditions</li>
            <li className="hover-link">Privacy Policy</li>
          </ul>
      </div>

      </div>
      <div className='subFoo'>
          <div className='credit-card-png'>
            <img></img>
          </div>
          <p>Copyright {new Date().getFullYear()} <imp>Commerce</imp> </p>
    </div>

    </div>
  )
}

export default Footer