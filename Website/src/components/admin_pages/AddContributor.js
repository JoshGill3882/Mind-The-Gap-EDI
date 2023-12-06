import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../FirebaseConfig";

function AddContributor() {

  const add_contributor = async (id, file_loc) => {
    const add_gm_rule_data = httpsCallable(functions, "contributors-addContributor");
    const rule_data = await add_gm_rule_data({
      contributorId: id, imageLocation: file_loc, name: new_name, link: new_link, areaOfExpertise: new_aoe, flavourText: new_text
    });
  };

  const [new_image, set_image] = useState([]);
  const [new_name, set_name] = useState([]);
  const [new_link, set_link] = useState([]);
  const [new_aoe, set_aoe] = useState([]);
  const [new_text, set_text] = useState([]);

  const handle_name = (event) => {
    set_name(event.target.value);
  };
  const handle_link = (event) => {
    set_link(event.target.value);
  };
  const handle_aoe = (event) => {
    set_aoe(event.target.value);
  };
  const handle_text = (event) => {
    set_text(event.target.value);
  };

  let navigate = useNavigate();

  const cancel_card = async () => {
    navigate("/edit_contributors");
  };

  const create_id = async() => {
    var result = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 15) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    };
    return result;
  };

  const [file, setFile] = useState([]);

  const handle_file_change = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    };
  };

  const submit_contributor = async () => {
    if (file.length === 0 || new_name.length === 0 || new_name === "" || new_aoe.length === 0 || new_aoe === "" || new_text.length === 0 || new_text === ""){
      if (new_name.length === 0 || new_name === ""){
        alert("Please input the name of the contributor.");
      };
      if (file.length === 0){
        alert("Please upload an image for the contributor.");
      };
      if (new_aoe.length === 0 || new_aoe === ""){
        alert("Please input the area of expertise of the contributor.");
      };
      if (new_text.length === 0 || new_text === ""){
        alert("Please input some flavourtext around the contributor.");
      };
    } else {
      if (new_link.length === 0){
        set_link("");
      };
      const id = await create_id();
      var file_loc = "contributors/" + id + ".jpg";
      const storageRef = ref(storage, file_loc);
      await uploadBytes(storageRef, file, {contentType: 'image/jpeg'}).then(() => {});
      add_contributor(id, file_loc).then(() => {
        alert("Contributor " + new_name + " Added.");
        navigate("/edit_contributors");
      });
    };
  };

  return(
    <body>
      <div id="main">
        <h2> Add Contributor </h2>
      </div>
      <div id="min_height">
        <div id="center">
          <h3> Name of Contributor </h3>
          <textarea id="edit_input_small" onChange={handle_name} ></textarea>
          <h3> Image of Contributor </h3>
          <input type="file" className="image_input" accept="image/*" id="file-input" name="ImageStyle" onChange={handle_file_change}/>
          <br /> <br />
          <h3> Area of Expertise: </h3>
          <textarea id="edit_input" onChange={handle_aoe}></textarea>
          <h3> Flavour Text: </h3>
          <textarea id="edit_input" onChange={handle_text}></textarea>
          <h3> Cardiff People's Link (if applicable): </h3>
          <textarea id="edit_input_small" onChange={handle_link}></textarea>
        </div>
      </div>
      <button type="button" id="delete_button" onClick={cancel_card}> Cancel </button>
      <button type="button" id="save_button" onClick={submit_contributor}> Add Contributor </button>
      <br /> <br /> <br /> <br /> <br />
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default AddContributor;
