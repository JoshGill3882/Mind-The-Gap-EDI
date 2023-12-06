import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";

function EditCards() {

  const get_all_cards = async () => {
    const get_all_card_data = httpsCallable(functions, "cards-getAll");
    const card_data = await get_all_card_data({ languageChoice: "English" });
    return card_data.data;
  };

  const [no_change, set_change] = useState("null");
  const [id, set_id] = useState([]);
  const [prompt, set_prompt] = useState([]);

  useEffect(() => {
    get_all_cards().then((data) => {
      if (data !== "No Cards Found"){
        var card_id = [];
        var card_prompt = [];
        for (let i = 0; i < Object.keys(data).length; i++){
          let current_card = data[Object.keys(data)[i]];
          var card_int = parseInt(Object.keys(current_card)[0]);
          card_id.push(card_int);
          card_prompt.push(current_card[Object.keys(current_card)[0]]);
          set_id(card_id);
          set_prompt(card_prompt);
        };
     };
    });
  }, [no_change]);

  var table_loop = [];

  for (let i = 0; i < Object.keys(id).length; i++){
    let link = "/edit_card?id=" + id[i];
    table_loop.push(
      <div>
        <table id="card_table">
          <tr>
            <td colSpan={2}> &nbsp; </td>
          </tr>
          <tr>
            <td id="card_id"> Card ID: {id[i]} </td>
            <td id="link_card">
              <Link to={link} className="view_card"> Edit Card </Link>
            </td>
          </tr>
          <tr>
            <td colSpan={2}> &nbsp; </td>
          </tr>
          <tr>
            <td colSpan={2} id="card_content"> {prompt[i]} </td>
          </tr>
        </table>
       </div>
     );
   };

  const [search_text, set_search] = useState(null);
  let navigate = useNavigate();
  const [error, set_error] = useState(null);

  const search_query = async () => {
    for (let i = 0; i < Object.keys(id).length; i++){
      if (id[i] ===  parseInt(search_text)){
        let link = "/edit_card?id=" + search_text;
        navigate(link);
      };
   set_error("Card ID does not exist.");
    }
  };

  const handle_search = (event) => {
    set_search(event.target.value);
  };

 return (
   <body>
     <div id="main">
       <h2> Edit Cards </h2>
     </div>
     <p> <br /> </p>
     <div id="center">
       <h3> Want to add a new card? </h3>
       <Link to="/add_card" className="add_button"> Add Card </Link>
       <p> <br /> </p>
       <h3> Want to edit an existing card? </h3>
       <br />
       <p> Please input the Card ID below: </p>
       <input type="text" id="login_input" required onChange={handle_search} placeholder="Card ID"/>
       &nbsp;&nbsp;&nbsp;
       <button onClick={search_query} id="login_button"> Search </button>
       <p id="error_message"> {error} </p>
       <h3> OR </h3>
       <p> Scroll through all the available cards below: </p>
     </div>
     {table_loop}
     <p> <br /> </p>
     <p> <br /> </p>
     <footer>
       <p id="footer"> Website designed for the card game: Mind The Gap </p>
     </footer>
   </body>
 );
};

export default EditCards;
