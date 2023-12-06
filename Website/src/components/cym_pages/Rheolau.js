import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { isMobile } from "react-device-detect";

function Rheolau() {

    const get_rules = async () => {
      const get_rule_data = httpsCallable(functions, "rules-getRules");
      const rule_data = await get_rule_data({ languageChoice: "Welsh" });
      return rule_data.data;
    }

    const [no_change, set_change] = useState("null");
    const [player, set_player] = useState([]);
    const [gamemaster, set_gm] = useState([]);

    useEffect(() => {
      get_rules().then((data) => {
        if (Object.keys(data)[0] === "error"){} else {
          var player_rule = [];
          var gm_rule = [];
          for (let i=0; i < 2; i++){
            if (Object.keys(data)[i] === "Player"){
              player_rule.push(data[Object.keys(data)[i]]);
            };
            if (Object.keys(data)[i] === "Game Master"){
              gm_rule.push(data[Object.keys(data)[i]]);
            };
            set_player(player_rule);
            set_gm(gm_rule);
          };
        }
      });
    }, [no_change]);

    var enumerate_gm_rules = []

    for (const i in gamemaster[0]){
      enumerate_gm_rules.push(
      <div>
        <br />
        <div id="rule">
        <p> {gamemaster[0][i]} </p>
        </div>
      </div>
      );
    };

    var enumerate_player_rules = [];

    for (const i in player[0]){
      enumerate_player_rules.push(
      <div>
        <br />
        <div id="rule">
        <p> {player[0][i]} </p>
        </div>
      </div>
      );
    };

  return (
    <body>
      <div id="main">
        <Link to="/rules" className="language_button"> English </Link>
        <h2> Rheolau </h2>
      </div>
      <div id="center">
        <p> <br /> </p>
        <div id="box_content_dark">
          <h3> <b> Crynodeb o'r gêm gardiau </b> </h3>
          <p> Nod y gêm yw annog sgyrsiau am gydraddoldeb, Amrywiaeth a chynhwysiant. </p>
          <p>
            Un wrth un, bydd pob chwaraewr yn dewis cerdyn ac yn ei gyflwyno i i'r
            ystafell. Mae'r chwaraewr yn darllen y cyfarwyddiadau ar y cerdyn a
            Yna gall yr ystafell drafod y pwnc a ddewiswyd ar hap.
          </p>
        </div>
        <p> <br /> </p>
      </div>
      {isMobile ?
        <div className="rule_boxes_mobile">
          <div id="box_content_light">
            <h3> <b> Rheolau Gamemaster: </b> </h3>
            <p> {enumerate_gm_rules} </p>
          </div>
          <div id="box_content_light">
            <h3> <b> Rheolau'r Chwaraewr: </b> </h3>
            <p> {enumerate_player_rules} </p>
          </div>
        </div>
        :
        <div className="rule_boxes">
          <div id="box_content_light">
            <h3> <b> Rheolau Gamemaster: </b> </h3>
            <p> {enumerate_gm_rules} </p>
          </div>
          <div id="box_content_light">
            <h3> <b> Rheolau'r Chwaraewr: </b> </h3>
            <p> {enumerate_player_rules} </p>
          </div>
        </div>
      }
      <br />
      <br />
      <footer>
        Cynlluniwyd y wefan ar gyfer y gêm cardiau: Mind The Gap
      </footer>
    </body>
  );
};

export default Rheolau;
