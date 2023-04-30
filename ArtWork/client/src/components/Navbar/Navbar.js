import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
function Navbar() {
  return (
    <div className='Navbar'>
        <div className="container nav-container">
            <div className="nav-left">
              <ul className='link-group'>
                <li className='hover-link'>
                  <Link className='link' to="/products?category=comic">
                    Comic
                  </Link>
                </li>
                <li className='hover-link'>
                  <Link className='link' to="/products?category=shows">
                    TV SHOW
                  </Link>
                </li>
                <li className='hover-link'>
                  <Link className='link' to="/products?category=sports">
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
              <div className='nav-center'>
                <Link to="/">
                  <h1 className='banner'>ARTWORK</h1>
                </Link>
              </div>

              <div className='nav-right'>
                <div className='nav-cart hover-link'>
                  <BsCart2 className='icon'/>
                  <span className='cart-count center'>99</span>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Navbar