import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../functions/login";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { isMobile } from "react-device-detect";

function Login() {
  let navigate = useNavigate();
  const [user, set_user] = useState(null);
  const [password, set_password] = useState(null);

  const page_login = async () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        login(navigate, user, password)
      })
      .catch((error) => {
      });
  };

  const handle_user = (event) => {
    set_user(event.target.value);
  };

  const handle_password = (event) => {
    set_password(event.target.value);
  };

  return (
    <body>
      {isMobile ?
        <div>
          <div id="center">
            <p> <br /> </p>
            <h3> Please use a desktop browser to login. </h3>
          </div>
        </div>
        :
        <div>
          <div id="main">
            <Link to="/mewngofnodi" className="language_button"> Cymraeg </Link>
            <h2> Login </h2>
          </div>
          <div id="center">
            <form>
              <p> <br /> </p>
              <h3> Email: </h3>
              <input type="email" id="login_input" required onChange={handle_user}/>
              <h3> Password: </h3>
              <input type="password" id="login_input" required onChange={handle_password}/>
              <p> <br /> </p>
              <button type="button" id="login_button" onClick={page_login}> Login </button>
            </form>
          </div>
        </div>
       }
      <footer>
        Website designed for the card game: Mind The Gap
      </footer>
    </body>
  );
};


export default Login;
