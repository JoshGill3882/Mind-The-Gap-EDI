import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../FirebaseConfig";

function EditContributors() {
  const get_contributors = async () => {
    const get_contributor_data = httpsCallable(functions, "contributors-getContributors");
    const contributor_data = await get_contributor_data({ languageChoice: "English" });
    return contributor_data.data;
  };

  const [no_change, set_change] = useState("null");
  const [id, set_id] = useState([]);
  const [name, set_name] = useState([]);
  const [image, set_image] = useState([]);
  const [role, set_role] = useState([]);
  const [f_text, set_text] = useState([]);
  const [link, set_link] = useState([]);

  useEffect(() => {
    get_contributors().then((data) => {
      var c_id = [];
      var c_name = [];
      var c_image = [];
      var c_role = [];
      var c_text = [];
      var c_link = [];
      for (let i=0; i < Object.keys(data).length; i++){
        let contributor = data[Object.keys(data)[i]];
        for (let j = 0; j < Object.keys(contributor).length; j++){
          c_id.push(Object.keys(contributor));
          let information = contributor[Object.keys(contributor)[j]];
          for (let k = 0; k < Object.keys(information).length; k++){
            if (Object.keys(information)[k] === "Name"){
              c_name.push(information[Object.keys(information)[k]]);
            };
            if (Object.keys(information)[k] === "Image Location"){
              c_image.push(information[Object.keys(information)[k]]);
            };
            if (Object.keys(information)[k] === "Area Of Expertise"){
              c_role.push(information[Object.keys(information)[k]]);
            };
            if (Object.keys(information)[k] === "Flavour Text"){
              c_text.push(information[Object.keys(information)[k]]);
            };
            if (Object.keys(information)[k] === "Link"){
              c_link.push(information[Object.keys(information)[k]]);
            };
          };
        };
        set_id(c_id);
        set_name(c_name);
        set_image(c_image);
        set_role(c_role);
        set_text(c_text);
        set_link(c_link);
      };
    });
  }, [no_change]);

  const get_image_bytes = async (image) => {
    if (image.length === 0){} else {
      const storage_ref = ref(storage, "/" + image);
      getDownloadURL(storage_ref).then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        const img = document.getElementById(image);
        img.setAttribute("src", url);
      });
    };
  };

  var table_loop = [];

  for (let i = 0; i < Object.keys(name).length; i++){
    let wanted_name = "";
    let wanted_image = "";
    let wanted_role = "";
    let wanted_text = "";
    let wanted_link = "";
    if (Array.isArray(name[i])){
      let array_i = name[i];
      wanted_name = array_i[0];
    } else {
      wanted_name = name[i];
    };
    if (Array.isArray(image[i])){
      let array_i = image[i];
      wanted_image = array_i[0];
    } else {
      wanted_image = image[i];
    };
    if (Array.isArray(role[i])){
      let array_i = role[i];
      wanted_role = array_i[0];
    } else {
      wanted_role = role[i];
    };
    if (Array.isArray(f_text[i])){
      let array_i = f_text[i];
      wanted_text = array_i[0];
    } else {
      wanted_text = f_text[i];
    };
    if (Array.isArray(link[i])){
      let array_i = link[i];
      wanted_link = array_i[0];
    } else {
      wanted_link = link[i];
    };
    if (i === 0 || (i % 2) === 0){
      let link = "/edit_contributor?id=" + id[i];
       table_loop.push(
         <table id="contributors_even">
            <tr>
              <th rowSpan={5} id="contributor_image"><img className="contributor_image" src={get_image_bytes(wanted_image)} id={wanted_image}/></th>
              <td id="contributor_data"> <b> {wanted_name} </b> </td>
            </tr>
            <tr>
              <td id="contributor_data"> <p id="paragraphing">  {wanted_role} </p> </td>
              </tr>
            <tr>
              <td id="contributor_data"> <p id="paragraphing"> <i> "{wanted_text}" </i> </p> </td>
             </tr>
            <tr>
              <td id="contributor_link"> <p id="paragraphing"> <a id="cardiff_people" href={wanted_link}> {wanted_link} </a> </p> </td>
             </tr>
            <tr>
              <Link to={link} className="view_contributor"> Edit Contributor </Link>
            </tr>
         </table>
       )} else {
         let link_2 = "/edit_contributor?id=" + id[i];
         table_loop.push(
           <table id="contributors_odd">
             <tr>
               <th rowSpan={5} id="contributor_image"><img className="contributor_image" src={get_image_bytes(wanted_image)} id={wanted_image} /></th>
               <td id="contributor_data"> <b> {wanted_name} </b> </td>
             </tr>
             <tr>
               <td id="contributor_data"> <p id="paragraphing">  {wanted_role} </p> </td>
               </tr>
             <tr>
               <td id="contributor_data"> <p id="paragraphing"> <i> "{wanted_text}" </i> </p> </td>
              </tr>
             <tr>
               <td id="contributor_link"> <p id="paragraphing"> <a id="cardiff_people" href={wanted_link}> {wanted_link} </a> </p> </td>
              </tr>
             <tr>
               <Link to={link_2} className="view_contributor"> Edit Contributor </Link>
             </tr>
           </table>
         )};
    };

  return (
    <body>
      <div id="main">
        <h2> Edit Contributors </h2>
      </div>
      <div id="center">
        <br />
        <h3> Want to add a new contributor? </h3>
        <Link to="/add_contributor" className="add_button"> Add Contributor </Link>
        <p> <br /> </p>
        <h3> Want to edit an existing contributor? </h3>
      </div>
      {table_loop}
      <br /> <br /> <br /><br />
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default EditContributors;
