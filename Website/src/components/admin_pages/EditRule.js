import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";

function EditRule() {

  const query_parameters = new URLSearchParams(window.location.search);
  const rule_type = query_parameters.get("type");
  const rule_id = query_parameters.get("id");

  var update_type = "";

  if (rule_type === "gamemaster"){
    update_type = "Game Master";
  } else {
    update_type = "Player";
  };

  let navigate = useNavigate();

  const get_rule = async () => {
    const get_rule_data = httpsCallable(functions, "rules-getRule");
    const rule_data = await get_rule_data({
      ruleType: update_type, index: rule_id
    });
    return rule_data.data;
  };

  const edit_gm_rule = async () => {
    const edit_gm_rule_data = httpsCallable(functions, "rules-editGameMasterRule");
    const rule_data = await edit_gm_rule_data({
      newRule: new_rule, oldRule: rule_description
    });
  };

  const edit_player_rule = async () => {
    const edit_player_rule_data = httpsCallable(functions, "rules-editPlayerRule");
    const rule_data = await edit_player_rule_data({
      newRule: new_rule, oldRule: rule_description
    });
  };

  const delete_gm_rule = async () => {
    const delete_gm_rule_data = httpsCallable(functions, "rules-deleteGameMasterRule");
    const rule_data = await delete_gm_rule_data({
      ruleContent: rule_description
    });
  };

  const delete_player_rule = async () => {
    const delete_player_rule_data = httpsCallable(functions, "rules-deletePlayerRule");
    const rule_data = await delete_player_rule_data({
      ruleContent: rule_description
    });
  };

  const [no_change, set_change] = useState("null");
  const [rule_description, set_description] = useState("null");

  useEffect(() => {
    get_rule().then((data) => {
      set_description(data);
    });
  }, [no_change]);

  const [new_rule, set_rule] = useState([]);

  const handle_rule = (event) => {
    set_rule(event.target.value);
  };

  const save_changes = async () => {
    if (new_rule.length === 0 || new_rule === ""){
      alert("No changes to save.");
      navigate("/edit_rules");
    } else {
      if (update_type === "Game Master"){
        edit_gm_rule().then(() => {
          alert("Changes to this rule have been saved.");
          navigate("/edit_rules");
        });
      } else {
        if (update_type === "Player"){
          edit_player_rule().then(() => {
            alert("Changes to this rule have been saved.");
            navigate("/edit_rules");
          });
        };
      };
    };
  };

  const check_delete_rule = async () => {
    if (window.confirm("Press 'OK' to delete this rule.")){
      if (update_type === "Game Master"){
        delete_gm_rule().then(() => {
          alert("This rule has been deleted");
          navigate("/edit_rules");
        });
      } else {
        if (update_type === "Player"){
          delete_player_rule().then(() => {
            alert("This rule has been deleted");
            navigate("/edit_rules");
          });
        };
      };
    };
  };

  const cancel_changes = async () => {
    if (window.confirm("Press 'OK' to cancel all changes.")){
      navigate("/edit_rules");
    };
  };

  return(
    <body>
      <div id="main">
        <h2> Edit Rule </h2>
      </div>
      <div id="min_height">
        <div id="center">
          <br />
          <h3> The current {rule_type} rule's description: </h3>
          <p> <i id="paragraphing_small"> "{rule_description}" </i> </p>
          <br />
          <h3> Edit the rule's description here: </h3>
          <textarea id="edit_input" onChange={handle_rule}></textarea>
        </div>
      </div>
      <button type="button" id="delete_button" onClick={check_delete_rule}> Delete Card </button>
      <button type="button" id="save_button" onClick={save_changes}> Save Changes </button>
      <button type="button" id="cancel_button" onClick={cancel_changes}> Cancel Changes </button>
      <br /> <br /> <br /> <br /> <br />
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default EditRule;
