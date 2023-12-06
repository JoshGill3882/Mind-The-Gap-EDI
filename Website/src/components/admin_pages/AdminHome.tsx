import React from 'react';
import MediumLogo from "../../Images/Home Logo.png"

function AdminHome() {
  return (
    <body>
      <div id="main">
        <img src={MediumLogo} alt="MIND THE GAP" id="title_image" />
      </div>
      <div id="center">
        <p> <br /> </p>
        <h3> Welcome to the Admin Home page.</h3>
        <p> <br /> </p>
        <p>
          Here, you will be able to add, edit and remove cards, rules and
          contributors from the database. In addition to this, you can also view
          the comments left by anomynous users to help view feedback on the card
          contents.
        </p>
        <p>
          Please press one of the tabs in the top right of this page to start
          editing!
        </p>
      </div>
      <footer>
        Website designed for the card game: Mind The Gap
      </footer>
    </body>
  );
}

export default AdminHome;
