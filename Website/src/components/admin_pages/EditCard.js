import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";

function EditCard() {

  const delete_card = async () => {
    const delete_card_data = httpsCallable(functions, "cards-deleteCard");
    const card_data = await delete_card_data({ cardId: type });
    return card_data.data;
  };

  const edit_card = async () => {
    const edit_card_data = httpsCallable(functions, "cards-editCard");
    if (new_prompt.length === 0 || new_prompt === ""){
      const card_data = await edit_card_data({
        cardId: type, prompt: prompt, details: new_details
      });
    } else {
      if (new_details.length === 0 || new_details === ""){
        const card_data = await edit_card_data({
          cardId: type, prompt: new_prompt, details: details
        });
      } else {
        const card_data = await edit_card_data({
          cardId: type, prompt: new_prompt, details: new_details
        });
      };
    };
  };

  const query_parameters = new URLSearchParams(window.location.search);
  const type = query_parameters.get("id");

  let navigate = useNavigate();

  const change_page = async () => {
    navigate("/admin");
  };

  const get_card = async () => {
    const get_card_data = httpsCallable(functions, "cards-getCard");
    const card_data = await get_card_data({
      cardId: type, languageChoice: "English"
    });
    return card_data.data;
  };

  const [no_change, set_change] = useState("null");
  const [prompt, set_prompt] = useState([]);
  const [details, set_details] = useState([]);

  useEffect(() => {
    if (type === null || type === ""){
      change_page();
    } else {
      get_card().then((data) => {
        if (Object.keys(data)[0] === "error"){
          change_page();
        } else {
          var card_prompt = [];
          var card_details = [];
          for (let i = 0; i < 2; i++){
            if (Object.keys(data)[i] === "prompt"){
              card_prompt.push(data[Object.keys(data)[i]]);
            };
            if (Object.keys(data)[i] === "details"){
              card_details.push(data[Object.keys(data)[i]]);
            };
            set_details(card_details);
            set_prompt(card_prompt);
          };
        };
      });
    };
  }, [no_change]);


  const [new_prompt, set_new_prompt] = useState([])
  const [new_details, set_new_details] = useState([])

  const save_changes = async () => {
    if (new_prompt.length === 0 || new_prompt === ""){
      if (new_details.length === 0 || new_details === ""){
        alert("Changes to Card ID: " + type + " have been saved.");
        navigate("/edit_cards");
      } else {
        edit_card().then(() => {
          alert("Changes to Card ID: " + type + " have been saved.");
          navigate("/edit_cards");
        });
      };
    } else {
      edit_card().then(() => {
        alert("Changes to Card ID: " + type + " have been saved.");
        navigate("/edit_cards");
      });
    };
  };

  const handle_prompt = (event) => {
    set_new_prompt(event.target.value);
  };

  const handle_details = (event) => {
    set_new_details(event.target.value);
  };

  const check_delete_card = async () => {
    if (window.confirm("Press 'OK' to delete Card ID: " + type)){
      delete_card().then(() => {
        alert("Card ID: " + type + " has been deleted.");
        navigate("/edit_cards");
      });
    };
  };

  const cancel_changes = async () => {
    if (window.confirm("Press 'OK' to cancel all changes.")){
      navigate("/edit_cards");
    };
  };

  return (
    <body>
      <div id="main">
        <h2> Edit Card ID: {type}  </h2>
      </div>
      <div id="min_height">
        <div id="center">
          <br />
          <p>
            Below are all the sections of the card that you can edit. You
            cannot edit the Card ID itself.
            <br />
            Each section will have the section title, what the text currently is
            in that section, followed by an input box.
          </p>
          <p> If you do NOT want to edit a section of a card, leave the box blank. </p>
          <br />
          <h3> Edit the card prompt: </h3>
          <i id="paragraphing_small"> "{prompt}" </i>
          <br /> <br />
          <textarea id="edit_input" placeholder="Edit card prompt here." onChange={handle_prompt}>{prompt}</textarea>
          <br />
          <h3> Edit the card guidance notes: </h3>
          <i id="paragraphing_small"> "{details}" </i>
          <br /> <br />
          <textarea id="edit_input" placeholder="Edit guidance notes here." onChange={handle_details}>{details}</textarea>
        </div>
        <button type="button" id="delete_button" onClick={check_delete_card}> Delete Card </button>
        <button type="button" id="save_button" onClick={save_changes}> Save Changes </button>
        <button type="button" id="cancel_button" onClick={cancel_changes}> Cancel Changes </button>
        <br /> <br /> <br /> <br /> <br />
      </div>
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default EditCard;
