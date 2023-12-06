import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";

function AddRule() {

  let navigate = useNavigate();

  const add_gm_rule = async () => {
    const add_gm_rule_data = httpsCallable(functions, "rules-addGameMasterRule");
    const rule_data = await add_gm_rule_data({
      ruleContent: new_rule
    });
  };

  const add_player_rule = async () => {
    const add_player_rule_data = httpsCallable(functions, "rules-addPlayerRule");
    const rule_data = await add_player_rule_data({
      ruleContent: new_rule
    });
  };

  const [rule_type, set_type] = useState("");
  const [new_rule, set_rule] = useState("");

  const handle_player_type = (event) => {
    set_type(event.target.value);
  }

  const handle_rule = (event) => {
    set_rule(event.target.value);
  };

  const cancel_card = async () => {
    navigate("/edit_rules");
  };

  const submit_rule = async () => {
    if (new_rule === null || new_rule === ""){
      alert("Please insert the rule's description.");
    } else {
      if (rule_type === "Game Master"){
        add_gm_rule().then(() => {
          alert("New Gamemaster Rule Added.");
          navigate("/edit_rules");
        });
      } else {
        if (rule_type === "Player"){
          add_player_rule().then(() => {
            alert("New Player Rule Added.");
            navigate("/edit_rules");
          });
        } else {
          alert('Please clarify who the rule is for: "Game Master" or "Player".');
        };
      };
    };
  };

  return(
    <body>
      <div id="main">
        <h2> Add Rule </h2>
      </div>
      <div id="min_height">
        <div id="center">
          <h3> Who is the rule for? </h3>
          <p> Please enter "Game Master" or "Player" in the box below. </p>
          <textarea id="edit_input_small" onChange={handle_player_type}></textarea>
          <h3> Please type in the new rule below: </h3>
          <textarea id="edit_input" onChange={handle_rule}></textarea>
        </div>
      </div>
      <button type="button" id="delete_button" onClick={cancel_card}> Cancel </button>
      <button type="button" id="save_button" onClick={submit_rule}> Add Rule </button>
      <br /> <br /> <br /> <br /> <br />
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default AddRule;
