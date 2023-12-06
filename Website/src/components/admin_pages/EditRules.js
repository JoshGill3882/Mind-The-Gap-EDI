import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";

function EditRules() {

  const get_rules = async () => {
    const get_rule_data = httpsCallable(functions, "rules-getRules");
    const rule_data = await get_rule_data({ languageChoice: "English" });
    return rule_data.data;
  };

  const [no_change, set_change] = useState("null");
  const [player, set_player] = useState([]);
  const [gamemaster, set_gm] = useState([]);

  useEffect(() => {
    get_rules().then((data) => {
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
    });
  }, [no_change]);

  var enumerate_gm_rules = [];
  var gm_rule_no = 0;

  for (const i in gamemaster[0]){
    let link = "/edit_rule?type=gamemaster&id=" + gm_rule_no;
    enumerate_gm_rules.push(
  	<div>
      <br />
  	  <div id="rule">
  		<p> {gamemaster[0][i]} </p>
      <Link to={link} className="view_card"> Edit Rule </Link>
      <br /> <br />
  	  </div>
  	</div>
    );
    gm_rule_no = gm_rule_no + 1;
  };

  var enumerate_player_rules = [];
  var player_rule_no = 0;

  for (const i in player[0]){
    let link = "/edit_rule?type=player&id=" + player_rule_no;
    enumerate_player_rules.push(
  	<div>
      <br />
  	  <div id="rule">
  		<p> {player[0][i]} </p>
      <Link to={link} className="view_card"> Edit Rule </Link>
      <br /> <br />
  	  </div>
  	</div>
    );
    player_rule_no = player_rule_no + 1;
  };

  return (
    <body>
      <div id="main">
        <h2> Edit Rules</h2>
      </div>
      <br />
      <div id="center">
        <h3> Want to add a new rule? </h3>
        <Link to="/add_rule" className="add_button"> Add New Rule </Link>
        <p> <br /> </p>
        <h3> Want to edit an existing rule? </h3>
        <br />
      </div>
      <div className="rule_boxes">
        <div id="box_content_light">
          <h3> <b> Gamemaster Rules: </b> </h3>
          <p> {enumerate_gm_rules} </p>
        </div>
        <div id="box_content_light">
          <h3> <b> Player Rules: </b> </h3>
          <p> {enumerate_player_rules} </p>
        </div>
      </div>
      <br />
      <br />
      <footer>
        Website designed for the card game: Mind The Gap
      </footer>
    </body>
  );
};


export default EditRules;
