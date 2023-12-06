import React, { useEffect, useState } from 'react';
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";

function ViewComments() {

  const get_comments = async () => {
    const get_comments_data = httpsCallable(functions, "comments-getComments");
    const comments_data = await get_comments_data({});
    return comments_data.data;
  };

  const delete_comment = async (id, comment_data) => {
    const delete_comment_data = httpsCallable(functions, "comments-deleteComment");
    const comments_data = await delete_comment_data({
      cardId: id, commentData: comment_data
    });
    return comments_data.data;
  };

  const [no_change, set_change] = useState("null");
  const [card_id, set_id] = useState([]);
  const [comment, set_comment] = useState([]);

  useEffect(() => {
    get_comments().then((data) => {
      var current_id = [];
      var current_details = [];
      for (let i = 0; i < Object.keys(data).length; i++){
        let comment_id = data[Object.keys(data)[i]]
        let comments = comment_id[Object.keys(comment_id)[0]]
        for (let j = 0; j < Object.keys(comments).length; j++){
          current_id.push(Object.keys(comment_id)[0]);
          current_details.push(comments[Object.keys(comments)[j]]);
        }
      }
      set_id(current_id)
      set_comment(current_details)
    });
  }, [no_change]);

  const check_delete = (event) => {
    if (window.confirm("Press 'OK' to the comment on Card ID: " + card_id[event.target.id])){
      delete_comment(card_id[event.target.id], comment[event.target.id]).then(() => {
        alert("Card ID: " + card_id[event.target.id] + " has been deleted.")
        window.location.reload();
      });
    };
  }


  var table_loop = [];

  for (let i = 0; i < Object.keys(card_id).length; i++){
    if (i === 0 || (i % 2) === 0){
      table_loop.push(
        <table id="contributors_even">
          <tr>
            <th id="contributor_data"> Card ID: {card_id[i]} </th>
          </tr>
          <tr>
            <td id="contributor_data"> "{comment[i]}" </td>
          </tr>
          <tr>
            <button type="button" className="delete_right_button" id={i} onClick={check_delete} > Delete Comment </button>
          </tr>
        </table>
      )} else {
         table_loop.push(
           <table id="contributors_odd">
             <tr>
               <td id="contributor_data"> Card ID:{card_id[i]} </td>
             </tr>
             <tr>
               <td id="contributor_data"> "{comment[i]}" </td>
             </tr>
             <tr>
               <button type="button" className="delete_right_button" id={i} onClick={check_delete}> Delete Comment </button>
             </tr>
           </table>
         )};
    };

  return (
    <body>
      <div id="main">
        <h2> View Comments </h2>
      </div>
      <div id="center">
        <br />
        <h3> These are all the comments left by anomynous people.</h3>
        <br />
      </div>
      {table_loop}
      <footer>
        Website designed for the card game: Mind The Gap
      </footer>
    </body>
  );
}

export default ViewComments;
