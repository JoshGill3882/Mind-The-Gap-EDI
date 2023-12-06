import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { isMobile } from "react-device-detect";

function Card() {

  const query_parameters = new URLSearchParams(window.location.search);
  const type = query_parameters.get("id");

  let navigate = useNavigate();

  const change_page = async () => {
    navigate("/home");
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

  const change_lang = async () => {
    let link = "/cerdyn?id=" + type;
    navigate(link);
  };

  const [comment_left, set_comment] = useState(null);

  const handle_comment = (event) => {
    set_comment(event.target.value);
  };

  const submit_comment = async () => {
    if (comment_left === null || comment_left === ""){
      alert("Please leave a comment before submitting.");
    } else {
      alert("Thank you for leaving a comment.");
      add_comment().then();
    };
  };

  const add_comment = async () => {
    const add_commentData = httpsCallable(functions, "comments-addComment");
    await add_commentData({
      commentData: comment_left, cardId: type
    });
  };

  return (
    <body>
      <div id="main">
        <button onClick={change_lang} id="language_button"> Cymraeg </button>
        <h2> Card ID: {type}  </h2>
      </div>
      <div id="min_height">
        {isMobile ?
          <div id="center_mobile">
            <br />
            <div id="card_page_border_mobile">
              <br />
              <h3>{prompt}</h3>
              <br />
              <hr />
              <br />
              <p id="paragraphing"> {details} </p>
            </div>
          </div>
          :
          <div id="center">
            <br />
            <div id="card_page_border">
              <br />
              <h3>{prompt}</h3>
              <br />
              <hr />
              <br />
              <p id="paragraphing"> {details} </p>
            </div>
          </div>
        }
        <br />
      </div>
      <div id="comment_box">
        <br />
        <div id="center">
          <p> Leave a comment? </p>
          <form>
            <p>
            <textarea rows={10} id="comment_input" onChange={handle_comment} placeholder="Comment Here" />
            <button type="button" onClick={submit_comment} id="comment_submit"> Submit </button>
            </p>
            <p> <br /> <br /> <br /> </p>
          </form>
        </div>
      </div>
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default Card;
