import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

function Chwilio() {

     const get_all_cards = async () => {
       const get_all_card_data = httpsCallable(functions, "cards-getAll");
       const card_data = await get_all_card_data({ languageChoice: "Welsh" });
       return card_data.data;
     };

     const [no_change, set_change] = useState("null");
     const [id, set_id] = useState([]);
     const [prompt, set_prompt] = useState([]);

     useEffect(() => {
       get_all_cards().then((data) => {
         if (Object.keys(data)[0] === "error"){} else {
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

     for (let i = 0; i < Object.keys(id).length; i+=2){
       let link = "/cerdyn?id=" + id[i];
       let link2 = "/cerdyn?id=" + id[i+1];
       if (id[i+1] === undefined){
         table_loop.push(
           <div className="card_boxes">
             <div id="card_box">
               <table id="table_background">
                 <tr>
                   <td colSpan={2}> &nbsp; </td>
                 </tr>
                 <tr>
                   <td id="card_id"> Card ID: {id[i]} </td>
                   <td id="link_card"> <Link to={link} className="view_card"> Gweld cerdyn </Link> </td>
                 </tr>
                 <tr>
                   <td colSpan={2}> &nbsp; </td>
                 </tr>
                 <tr>
                   <td colSpan={2} id="card_content"> {prompt[i]} </td>
                 </tr>
               </table>
             </div>
            </div>
         );
       } else {
        table_loop.push(
        <div className="card_boxes">
          <div id="card_box">
            <table id="table_background">
              <tr>
                <td colSpan={2}> &nbsp; </td>
              </tr>
              <tr>
                <td id="card_id"> Card ID: {id[i]} </td>
                <td id="link_card"> <Link to={link} className="view_card"> Gweld cerdyn</Link> </td>
              </tr>
              <tr>
                <td colSpan={2}> &nbsp; </td>
              </tr>
              <tr>
                <td colSpan={2} id="card_content"> {prompt[i]} </td>
              </tr>
            </table>
          </div>
          <div id="card_box">
            <table id="table_background">
              <tr>
                <td colSpan={2}> &nbsp; </td>
              </tr>
              <tr>
                <td id="card_id"> Card ID: {id[i+1]} </td>
                <td id="link_card"> <Link to={link2} className="view_card"> Gweld cerdyn </Link> </td>
              </tr>
              <tr>
                <td colSpan={2}> &nbsp; </td>
              </tr>
              <tr>
                <td colSpan={2} id="card_content"> {prompt[i+1]}</td>
              </tr>
            </table>
          </div>
        </div>
      )};
    };

    var table_loop_mobile = [];

    for (let i = 0; i < Object.keys(id).length; i++){
    let link = "/card?id=" + id[i];
      table_loop_mobile.push(
        <div className="card_boxes">
          <div id="card_box">
            <table id="table_background">
              <tr>
                <td colSpan={2}> &nbsp; </td>
              </tr>
              <tr>
                <td id="card_id"> Card ID: {id[i]} </td>
                <td id="link_card"> <Link to={link} className="view_card"> Gweld cerdyn </Link> </td>
              </tr>
              <tr>
                <td colSpan={2}> &nbsp; </td>
              </tr>
              <tr>
                <td colSpan={2} id="card_content"> {prompt[i]} </td>
              </tr>
            </table>
          </div>
         </div>
      );
    };

   const [search_text, set_search] = useState(null);
   let navigate = useNavigate();
   const [error, set_error] = useState(null);

   const search_query = async () => {
     for (let i = 0; i < Object.keys(id).length; i++){
       if (id[i] ===  parseInt(search_text)){
         let link = "/cerdyn?id=" + search_text;
         navigate(link);
       };
    set_error("Nid yw cerdyn adnabod yn bodoli.");
      };
   };

   const handle_search = (event) => {
     set_search(event.target.value);
   };

  return (
    <body>
      <div id="main">
        <Link to="/search" className="language_button"> English </Link>
        <h2> Chwilio </h2>
      </div>
      <p> <br /> </p>
      {isMobile ?
        <div>
          <div id="center">
            <h3> Mewnbynnwch eich ID Cerdyn isod: </h3>
            <input type="search" id="login_input" required onChange={handle_search} placeholder="ID Cerdyn"/>
            &nbsp;&nbsp;&nbsp;
            <button onClick={search_query} id="login_button"> Chwilio </button>
            <p id="error_message"> {error} </p>
            <p> <br /> </p>
            <h3> Methu dod o hyd i'ch cerdyn? </h3>
            <p> Chwiliwch drwy'r cardiau sydd ar gael isod: </p>
          </div>
          {table_loop_mobile}
          <p> <br /> </p>
          <p> <br /> </p>
        </div>
        :
        <div>
          <div id="center">
            <h3> Mewnbynnwch eich ID Cerdyn isod: </h3>
            <input type="search" id="login_input" required onChange={handle_search} placeholder="ID Cerdyn"/>
            &nbsp;&nbsp;&nbsp;
            <button onClick={search_query} id="login_button"> Chwilio </button>
            <p id="error_message"> {error} </p>
            <p> <br /> </p>
            <h3> Methu dod o hyd i'ch cerdyn? </h3>
            <p> Chwiliwch drwy'r cardiau sydd ar gael isod: </p>
          </div>
          {table_loop}
          <p> <br /> </p>
          <p> <br /> </p>
        </div>
      }

      <footer>
        <p id="footer"> Cynlluniwyd y wefan ar gyfer y gêm cardiau: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default Chwilio;
