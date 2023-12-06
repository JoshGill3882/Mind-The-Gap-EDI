import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";

function AddCard() {

  const add_card = async () => {
    const add_card_data = httpsCallable(functions, "cards-addCard");
    const card_data = await add_card_data({
      cardId: card_id, prompt: card_prompt, details: card_details
    });
    return card_data.data;
  };

  const get_card = async () => {
    const get_card_data = httpsCallable(functions, "cards-getCard");
    const card_data = await get_card_data({
      cardId: card_id, languageChoice: "English"
    });
    return card_data.data;
  };

  let navigate = useNavigate();

  const cancel_card = async () => {
    navigate("/edit_cards");
  };

  const [card_id, set_card_id] = useState(null);
  const [card_prompt, set_card_prompt] = useState(null);
  const [card_details, set_card_details] = useState(null);

  const handle_id = (event) => {
    set_card_id(event.target.value);
  };
  const handle_prompt = (event) => {
    set_card_prompt(event.target.value);
  };
  const handle_details = (event) => {
    set_card_details(event.target.value);
  };

  const submit_card = async () => {
    let id_int = parseInt(card_id, 10);
    if (card_id === null || isNaN(id_int)){
      alert("Invalid Card ID. Card ID must be an integer from 101 to 999.");
    } else {
      if (id_int > 100 && id_int < 1000){
        if (card_prompt === null || card_prompt === ""){
          alert("Please input the card's prompt.");
        } else {
          if (card_details === null || card_details === ""){
            set_card_details(" ");
          };
          get_card().then((data) => {
            if (Object.keys(data)[0] === "error"){
              add_card().then((data) => {
                if (data === "card with that ID already exists"){
                  alert("That Card ID already exists. Please input a different one.");
                } else {
                  alert("Card Successfully Added.");
                  navigate("/edit_cards");
                };
              });
            } else {
              alert("Card ID already exists. Please input a different ID.");
            };
          });
        };
      } else {
        alert("Invalid Card ID. Card ID must be an integer from 101 to 999.");
      };
    };
  };

  return (
    <body>
      <div id="main">
        <h2> Add Card  </h2>
      </div>
      <div id="min_height">
        <div id="center">
          <br />
          <h3> Card ID: </h3>
          <input type="text" id="edit_input_small" onChange={handle_id} />
          <br />
          <h3> Add the card prompt: </h3>
          <textarea id="edit_input" onChange={handle_prompt}></textarea>
          <br />
          <h3> Add the card guidance notes: </h3>
          <textarea id="edit_input" onChange={handle_details}></textarea>
        </div>
        <button type="button" id="delete_button" onClick={cancel_card}> Cancel </button>
        <button type="button" id="save_button" onClick={submit_card}> Add Card </button>
        <br /> <br /> <br /> <br /> <br />
      </div>
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default AddCard;
