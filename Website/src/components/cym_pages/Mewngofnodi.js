import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login_welsh } from "../functions/login_welsh";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { isMobile } from "react-device-detect";

function Mewngofnodi() {
  let navigate = useNavigate();
  const [user, set_user] = useState(null);
  const [password, set_password] = useState(null);

  const page_login = async () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        login_welsh(navigate, user, password);
      })
      .catch((error) => {
        console.log(error);
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
            <h3>Defnyddiwch borwr bwrdd gwaith i fewngofnodi. </h3>
          </div>
        </div>
        :
        <div>
          <div id="main">
            <Link to="/login" className="language_button"> English </Link>
            <h2> Mewngofnodi </h2>
          </div>
          <div id="center">
            <form>
              <p> <br /> </p>
              <h3> Cyfeiriad e-bost: </h3>
              <input type="email" id="login_input" required onChange={handle_user}/>
              <h3> Cyfrinair: </h3>
              <input type="password" id="login_input" required onChange={handle_password}/>
              <p> <br /> </p>
              <button type="button" id="login_button" onClick={page_login}> Mewngofnodi </button>
            </form>
          </div>
        </div>
      }

      <footer>
        Cynlluniwyd y wefan ar gyfer y gêm cardiau: Mind The Gap
      </footer>
    </body>
  );
}


export default Mewngofnodi;
