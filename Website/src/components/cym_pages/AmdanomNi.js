import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import { isMobile } from "react-device-detect";

function AmdanomNi() {

    const get_contributors = async () => {
      const get_contributor_data = httpsCallable(functions, "contributors-getContributors");
      const contributor_data = await get_contributor_data({ languageChoice: "Welsh" });
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
        var c_id = []
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
          }
          xhr.open("GET", url);
          xhr.send();
          const img = document.getElementById(image);
          img.setAttribute("src", url);
        })
      }
    }

    var table_loop = [];

    for (let i = 0; i < Object.keys(name).length; i++){
      let wanted_image = "";
      if (Array.isArray(image[i])){
        let array_i = image[i];
        wanted_image = array_i[0];
      } else {
        wanted_image = image[i];
      };
      if (i === 0 || (i % 2) === 0){
         table_loop.push(
           <table id="contributors_even">
             <tr>
               <th rowSpan={4} id="contributor_image"><img className="contributor_image" src={get_image_bytes(wanted_image)} id={wanted_image}/></th>
               <td id="contributor_data"> <b> {name[i]} </b> </td>
             </tr>
             <tr>
               <td id="contributor_data"> <p id="paragraphing"> {role[i]} </p></td>
             </tr>
             <tr>
               <td id="contributor_data"> <p id="paragraphing"> <i> "{f_text[i]}" </i> </p> </td>
             </tr>
             <tr>
               <td id="contributor_data"> <p id="paragraphing_link"> <a id="cardiff_people" href={link[i]}> {link[i]} </a> </p> </td>
             </tr>
           </table>
         )} else{
           table_loop.push(
             <table id="contributors_odd">
               <tr>
                 <th rowSpan={4} id="contributor_image"><img className="contributor_image" src={get_image_bytes(wanted_image)} id={wanted_image}/></th>
                 <td id="contributor_data"> {name[i]} </td>
               </tr>
               <tr>
                 <td id="contributor_data"> <p id="paragraphing"> {role[i]} </p></td>
               </tr>
               <tr>
                 <td id="contributor_data"> <p id="paragraphing"> <i> "{f_text[i]}" </i> </p> </td>
               </tr>
               <tr>
                 <td id="contributor_data"> <p id="paragraphing_link"> <a id="cardiff_people" href={link[i]}> {link[i]} </a> </p> </td>
               </tr>
             </table>
           )};
      };

      var table_loop_mobile = [];

      for (let i = 0; i < Object.keys(name).length; i++){
        let wanted_image = "";
        if (Array.isArray(image[i])){
          let array_i = image[i];
          wanted_image = array_i[0];
        } else {
          wanted_image = image[i];
        };
        let link_wanted = "";
        if (link[i] !== " "){
          link_wanted = link[i];
        }
        if (i === 0 || (i % 2) === 0){
           table_loop_mobile.push(
             <table id="contributors_even_mobile">
               <tr>
                 <td id="contributor_data_mobile"> <b> {name[i]} </b> </td>
               </tr>
               <tr>
                <th id="contributor_image_mobile"><img className="contributor_image_mobile" src={get_image_bytes(wanted_image)} id={wanted_image}/></th>
               </tr>
               <tr>
                 <td id="contributor_data_mobile"> <p id="paragraphing"> {role[i]} </p></td>
               </tr>
               <tr>
                 <td id="contributor_data_mobile"> <p id="paragraphing"> <i> "{f_text[i]}" </i> </p> </td>
               </tr>
               <tr>
                 <td id="contributor_data_mobile"> <p id="paragraphing_link"> <a id="cardiff_people" href={link[i]}>{link[i]}</a> </p> </td>
               </tr>
             </table>
           )} else {
             table_loop_mobile.push(
               <table id="contributors_odd_mobile">
                 <tr>
                   <td id="contributor_data_mobile"> <b> {name[i]} </b> </td>
                 </tr>
                 <tr>
                  <th id="contributor_image_mobile"><img className="contributor_image_mobile" src={get_image_bytes(wanted_image)} id={wanted_image}/></th>
                 </tr>
                 <tr>
                   <td id="contributor_data_mobile"> <p id="paragraphing"> {role[i]} </p></td>
                 </tr>
                 <tr>
                   <td id="contributor_data_mobile"> <p id="paragraphing"> <i> "{f_text[i]}" </i> </p> </td>
                 </tr>
                 <tr>
                   <td id="contributor_data_mobile"> <p id="paragraphing_link"> <a id="cardiff_people" href={link[i]}>{link[i]}</a> </p> </td>
                 </tr>
               </table>
             )};
        };

  return (
    <body>
      <div id="main">
        <Link to="/about_us" className="language_button"> English </Link>
        <h2> Amdanom Ni </h2>
      </div>
      {isMobile ?
        <div id="center_mobile">
          <h3> Prosiect Dyfodol Caerdydd yw hwn </h3>
          <p id="paragraphing_link"> <a id="cardiff_people" href="https://www.cardiff.ac.uk/cy">Cliciwch yma i ymweld â gwefan Prifysgol Caerdydd.</a> </p>
          <br />
          <h3> Cwrdd â'r Tîm: </h3>
          <br />
          {table_loop_mobile}
        </div>
        :
        <div id="center">
          <h3> Prosiect Dyfodol Caerdydd yw hwn </h3>
          <p id="paragraphing_link"> <a id="cardiff_people" href="https://www.cardiff.ac.uk/cy">Cliciwch yma i ymweld â gwefan Prifysgol Caerdydd.</a> </p>
          <br />
          <h3> Cwrdd â'r Tîm: </h3>
          <br />
          {table_loop}
        </div>
      }
      <br /> <br /> <br /><br />
      <footer>
        Cynlluniwyd y wefan ar gyfer y gêm cardiau: Mind The Gap
      </footer>
    </body>
  );
};

export default AmdanomNi;
