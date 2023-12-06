import React from 'react';
import { Link } from "react-router-dom";
import MediumLogo from "../../Images/Home Logo.png"
import { isMobile } from "react-device-detect";

function Home() {
  return (

    <body>
      {isMobile ?
        <div>
          <div id="main">
            <Link to="/hafan" className="language_button"> Cymraeg </Link>
            <p> <br /> </p>
            <img src={MediumLogo} alt="MIND THE GAP" id="title_image_mobile" />
          </div>
          <div className="boxes_mobile">
            <div id="box_mobile">
              Equality
            </div>
            <div id="box_mobile">
              Diversity
            </div>
            <div id="box_mobile">
              Inclusion
            </div>
          </div>
          <div id="center">
            <p>
              Cardiff University are committed to supporting, developing, and
              promoting these three topics throughout all their practices and
              activities, and we believe that there is a need for addressing the
              fears behind discussing these topics, due to their sensitivity.
            </p>
            <p>
              Mind the Gap is a set of playing cards that provide discussion prompts
              covering a range of potentially sensitive equality, diversity and
              inclusion topics. These cards were designed with the support and
              advise from marginalised individuals, and they aim to provide a way
              for people to overcome their nervousness when discussing these topics.
            </p>
            <p>
              This website is an additional resource to the game, providing
              supplementary guidance notes and background information around each
              card to further guide the discussion topics. We also want to gather
              more feedback from the wider community regarding the cards, so this
              website also allows user feedback that’ll allow us to improve the
              prompts, guidance notes and background information surrounding
              existing cards.
            </p>
            <br />
          </div>
          <footer>
            Website designed for the card game: Mind The Gap
          </footer>
        </div>
        :
        <div>
          <div id="main">
            <Link to="/hafan" className="language_button"> Cymraeg </Link>
            <p> <br /> </p>
            <img src={MediumLogo} alt="MIND THE GAP" id="title_image" />
          </div>
          <br />
          <div className="boxes">
            <div id="box">
              Equality
            </div>
            <div id="box">
              Diversity
            </div>
            <div id="box">
              Inclusion
            </div>
          </div>
          <div id="center">
            <p> <br /> </p>
            <p>
              Cardiff University are committed to supporting, developing, and
              promoting these three topics throughout all their practices and
              activities, and we believe that there is a need for addressing the
              fears behind discussing these topics, due to their sensitivity.
            </p>
            <p>
              Mind the Gap is a set of playing cards that provide discussion prompts
              covering a range of potentially sensitive equality, diversity and
              inclusion topics. These cards were designed with the support and
              advise from marginalised individuals, and they aim to provide a way
              for people to overcome their nervousness when discussing these topics.
            </p>
            <p>
              This website is an additional resource to the game, providing
              supplementary guidance notes and background information around each
              card to further guide the discussion topics. We also want to gather
              more feedback from the wider community regarding the cards, so this
              website also allows user feedback that’ll allow us to improve the
              prompts, guidance notes and background information surrounding
              existing cards.
            </p>
            <br />
          </div>
          <footer>
            Website designed for the card game: Mind The Gap
          </footer>
        </div>}

    </body>
  );
};

export default Home;
