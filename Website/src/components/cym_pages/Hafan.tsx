import React from 'react';
import { Link } from "react-router-dom";
import MediumLogo from "../../Images/Home Logo.png"
import { isMobile } from "react-device-detect";

function Hafan() {
  return (
    <body>
    {isMobile ?
      <div>
        <div id="main">
          <Link to="/home" className="language_button"> English </Link>
          <p> <br /> </p>
          <img src={MediumLogo} alt="MIND THE GAP" id="title_image_mobile" />
        </div>
        <div className="boxes_mobile">
          <div id="box_mobile_cym">
            Cydraddoldeb
          </div>
          <div id="box_mobile_cym">
            Amrywiaeth
          </div>
          <div id="box_mobile_cym">
            Cynhwysiad
          </div>
        </div>
        <div id="center">
          <p>
            Mae Prifysgol Caerdydd wedi ymrwymo i gefnogi, datblygu a hyrwyddo'r
            tri phwnc hyn drwy gydol eu holl arferion a gweithgareddau, a chredwn
            fod angen mynd i'r afael â'r ofnau y tu ôl i drafod y pynciau hyn,
            oherwydd eu sensitifrwydd.
          </p>
          <p>
            Mae Mind the Gap yn set o gardiau chwarae sy'n rhoi awgrymiadau trafod
            sy'n cwmpasu ystod o bynciau cydraddoldeb, amrywiaeth a chynhwysiant a
            allai fod yn sensitif. Cynlluniwyd y cardiau hyn gyda chefnogaeth a
            chyngor gan unigolion ar y cyrion, a'u nod yw darparu ffordd i bobl
            oresgyn eu nerfusrwydd wrth drafod y pynciau hyn.
          </p>
          <p>
            Mae'r wefan hon yn adnodd ychwanegol i'r gêm, gan ddarparu nodiadau
            canllaw atodol a gwybodaeth gefndirol o amgylch pob cerdyn i arwain y
            pynciau trafod ymhellach. Rydym hefyd am gasglu mwy o adborth gan y
            gymuned ehangach ynglŷn â'r cardiau, felly mae'r wefan hon hefyd yn
            caniatáu adborth defnyddwyr a fydd yn ein galluogi i wella'r
            awgrymiadau, y nodiadau cyfarwyddyd a'r wybodaeth gefndirol sy'n
            ymwneud â chardiau presennol.
          </p>
          <br />
        </div>
        <footer>
          Cynlluniwyd y wefan ar gyfer y gêm cardiau: Mind The Gap
        </footer>
      </div>
      :
      <div>
        <div id="main">
          <Link to="/home" className="language_button"> English </Link>
          <p> <br /> </p>
          <img src={MediumLogo} alt="MIND THE GAP" id="title_image" />
        </div>
        <br />
        <div className="boxes">
          <div id="box">
            Cydraddoldeb
          </div>
          <div id="box">
             Amrywiaeth
          </div>
          <div id="box">
            Cynhwysiad
          </div>
        </div>
        <div id="center">
          <p> <br /> </p>
          <p>
            Mae Prifysgol Caerdydd wedi ymrwymo i gefnogi, datblygu a hyrwyddo'r
            tri phwnc hyn drwy gydol eu holl arferion a gweithgareddau, a chredwn
            fod angen mynd i'r afael â'r ofnau y tu ôl i drafod y pynciau hyn,
            oherwydd eu sensitifrwydd.
          </p>
          <p>
            Mae Mind the Gap yn set o gardiau chwarae sy'n rhoi awgrymiadau trafod
            sy'n cwmpasu ystod o bynciau cydraddoldeb, amrywiaeth a chynhwysiant a
            allai fod yn sensitif. Cynlluniwyd y cardiau hyn gyda chefnogaeth a
            chyngor gan unigolion ar y cyrion, a'u nod yw darparu ffordd i bobl
            oresgyn eu nerfusrwydd wrth drafod y pynciau hyn.
          </p>
          <p>
            Mae'r wefan hon yn adnodd ychwanegol i'r gêm, gan ddarparu nodiadau
            canllaw atodol a gwybodaeth gefndirol o amgylch pob cerdyn i arwain y
            pynciau trafod ymhellach. Rydym hefyd am gasglu mwy o adborth gan y
            gymuned ehangach ynglŷn â'r cardiau, felly mae'r wefan hon hefyd yn
            caniatáu adborth defnyddwyr a fydd yn ein galluogi i wella'r
            awgrymiadau, y nodiadau cyfarwyddyd a'r wybodaeth gefndirol sy'n
            ymwneud â chardiau presennol.
          </p>
          <br />
        </div>
        <footer>
          Cynlluniwyd y wefan ar gyfer y gêm cardiau: Mind The Gap
        </footer>
      </div>
    }
    </body>
  );
};

export default Hafan;
