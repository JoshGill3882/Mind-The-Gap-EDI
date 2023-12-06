import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig";
import "./Navbar.css"
import { signOut as signOutAuth } from "firebase/auth";
import Logo from "../Images/Navbar Image.png"
import Title from "../Images/Navbar Title.png"
import MobileLogo from "../Images/Navbar Image Mobile.png"
import { isMobile } from "react-device-detect";

function Navbar(){
  let navigate = useNavigate();

  const logout = async() => {
    signOutAuth(auth).then(() => {
      navigate("/");
    });
  };

  const home_image_eng = async() => {
    navigate("/home");
  }

  const home_image_cym = async() => {
    navigate("/hafan");
  }

  const home_image_admin = async() => {
    navigate("/admin");
  }

  const [user, loading] = useAuthState(auth);
  if (loading) {}
  if (user) {
    return (
      <nav>
        <ul>
          <li>
            <img src={Logo} id="nav_logo" onClick={home_image_admin}/>
          </li>
          <li>
            <img src={Title} id="nav_logo" onClick={home_image_admin}/>
          </li>
          <li>
            <Link to="/edit_cards" className="links">Edit Cards</Link>
          </li>
          <li>
            <Link to="/edit_rules" className="links">Edit Rules</Link>
          </li>
          <li>
            <Link to="/edit_contributors" className="links">Edit Contributors</Link>
          </li>
          <li>
            <Link to="/view_comments" className="links">View Comments</Link>
          </li>
          <li>
            <button type="button" id="logout_button" onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    )
  } else {
    if (document.URL.includes("hafan") || document.URL.includes("mewngofnodi") || document.URL.includes("chwilio") || document.URL.includes("rheolau") || document.URL.includes("amdanom_ni") || document.URL.includes("cerdyn")){
      return (
        <nav>
          {isMobile ?
            <div>
              <ul>
                <li>
                  <img src={MobileLogo} id="nav_logo_mobile" onClick={home_image_cym} />
                </li>
                <li></li>
                <li>
                  <Link to="/chwilio" className="links">Chwilio</Link>
                </li>
                <li>
                  <Link to="/rheolau" className="links">Rheolau</Link>
                </li>
                <li>
                  <Link to="/amdanom_ni" className="links">Amdanom Ni</Link>
                </li>
                &nbsp;
              </ul>
            </div>
            :
            <div>
              <ul>
                <li>
                  <img src={Logo} id="nav_logo" onClick={home_image_cym} />
                </li>
                <li>
                  <img src={Title} id="nav_logo" onClick={home_image_cym}/>
                </li>
                <li>
                  <Link to="/chwilio" className="links">Chwilio</Link>
                </li>
                <li>
                  <Link to="/rheolau" className="links">Rheolau</Link>
                </li>
                <li>
                  <Link to="/amdanom_ni" className="links">Amdanom Ni</Link>
                </li>
                <li>
                  <Link to="/mewngofnodi" className="links">Mewngofnodi</Link>
                </li>
              </ul>
            </div>
          }

        </nav>
    )} else {
      return (
      <nav>
      {isMobile ?
        <div>
          <ul>
            <li>
              <img src={MobileLogo} id="nav_logo_mobile" onClick={home_image_eng}/>
            </li>
            <li></li>
            <li>
              <Link to="/search" className="links">Search</Link>
            </li>
            <li>
              <Link to="/rules" className="links">Rules</Link>
            </li>
            <li>
              <Link to="/about_us" className="links">About Us</Link>
            </li>
            &nbsp;
          </ul>
        </div>
        :
        <div>
          <ul>
            <li>
              <img src={Logo} id="nav_logo" onClick={home_image_eng}/>
            </li>
            <li>
              <img src={Title} id="nav_logo" onClick={home_image_eng}/>
            </li>
            <li>
              <Link to="/search" className="links">Search</Link>
            </li>
            <li>
              <Link to="/rules" className="links">Rules</Link>
            </li>
            <li>
              <Link to="/about_us" className="links">About Us</Link>
            </li>
            <li>
              <Link to="/login" className="links">Login</Link>
            </li>
          </ul>
        </div>
      }
      </nav>
    )};
  };
};

export default Navbar;
