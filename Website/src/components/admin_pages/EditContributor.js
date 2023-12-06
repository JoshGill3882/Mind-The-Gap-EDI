import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../FirebaseConfig";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../FirebaseConfig";

function EditContributor() {

  let navigate = useNavigate();

  const query_parameters = new URLSearchParams(window.location.search);
  const id = query_parameters.get("id");

  const get_contributor = async () => {
    const get_contributor_data = httpsCallable(functions, "contributors-getContributors");
    const contributor_data = await get_contributor_data({
      languageChoice: "English"
    });
    return contributor_data.data;
  };

  const edit_contributor = async (image, name, link, text, aoe) => {
    const edit_contributor_data = httpsCallable(functions, "contributors-editContributor");
    const contributor_data = await edit_contributor_data({
      contributorId: id, imageLocation: image, name: name, link: link, areaOfExpertise: aoe, flavourText: text
    });
    return contributor_data.data;
  };

  const delete_contributor = async () => {
    const delete_contributor_data = httpsCallable(functions, "contributors-deleteContributor");
    const contributor_data = await delete_contributor_data({
      contributorId: id
    });
    return contributor_data.data;
  };

  const [no_change, set_change] = useState("null");
  const [name, set_name] = useState([]);
  const [image, set_image] = useState([]);
  const [aoe, set_role] = useState([]);
  const [text, set_text] = useState([]);
  const [link, set_link] = useState([]);

  useEffect(() => {
    get_contributor().then((data) => {
      var c_name = [];
      var c_image = [];
      var c_role = [];
      var c_text = [];
      var c_link = [];
      for (let i = 0; i < Object.keys(data).length; i++){
        let contributor = data[Object.keys(data)[i]];
        for (let j = 0; j < Object.keys(contributor).length; j++){
          if (Object.keys(contributor)[0] === id){
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

          };
          set_name(c_name);
          set_image(c_image);
          set_role(c_role);
          set_text(c_text);
          set_link(c_link);
        };
    });
  }, [no_change]);

  const [new_image, set_new_image] = useState([]);
  const [new_name, set_new_name] = useState([]);
  const [new_link, set_new_link] = useState([]);
  const [new_aoe, set_new_aoe] = useState([]);
  const [new_text, set_new_text] = useState([]);

  const handle_image = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      set_new_image(e.target.files[0]);
    };
  };
  const handle_name = (event) => {
    set_new_name(event.target.value);
  };
  const handle_link = (event) => {
    set_new_link(event.target.value);
  };
  const handle_aoe = (event) => {
    set_new_aoe(event.target.value);
  };
  const handle_text = (event) => {
    set_new_text(event.target.value);
  };

  const check_delete = async () => {
    if (window.confirm("Press 'OK' to delete this contributor.")){
      const storage_ref = ref(storage, "/" + image);
      deleteObject(storage_ref).then(() => {
      });
      delete_contributor().then(() => {
        alert("This contributor has been deleted");
        navigate("/edit_contributors");
      });
    };
  };

  const save_changes = async () => {
    var pick_name = [];
    var pick_link = [];
    var pick_aoe = [];
    var pick_text = [];
    if (new_name.length === 0 || new_name === ""){
      pick_name.push(name.toString());
    } else {
      pick_name.push(new_name.toString());
    };
    if (new_link.length === 0 || new_link === ""){
      pick_link.push(link.toString());
    } else {
      pick_link.push(new_link.toString());
    };
    if (new_aoe.length === 0 || new_aoe === ""){
      pick_aoe.push(aoe.toString());
    } else {
      pick_aoe.push(new_aoe.toString());
    };
    if (new_text.length === 0 || new_text === ""){
      pick_text.push(text.toString());
    } else {
      pick_text.push(new_text.toString());
    };
    if (new_image.length === 0){
      var file_loc = "contributors/" + id +".jpg";
      edit_contributor(file_loc, pick_name, pick_link, pick_text, pick_aoe).then(() => {
        alert("Saved Changes.");
        navigate("/edit_contributors");
      });
    } else {
      var file_loc = "contributors/" + id +".jpg";
      const storageRef = ref(storage, file_loc);
      await uploadBytes(storageRef, new_image, {contentType: 'image/jpeg'}).then(() => {
      });
      edit_contributor(file_loc, pick_name, pick_link, pick_text, pick_aoe).then(() => {
        alert("Saved Changes.");
        navigate("/edit_contributors");
      });
    };
  };

  const cancel_changes = async () => {
    if (window.confirm("Press 'OK' to cancel all changes.")){
      navigate("/edit_contributors");
    };
  };

  return(
    <body>
      <div id="main">
        <h2> Edit Contributor </h2>
      </div>
      <div id="min_height">
        <div id="center">
          <br />
          <p>
            Below are all the sections of a contributor that you can edit.
            <br />
            Each section will have the section title, what the text/image that
            is currently in that section, followed by an input box.
          </p>
          <p> If you do NOT want to edit a section of the contributor, leave the box blank. </p>
          <p> <br /> </p>
          <h3> Name of Contributor </h3>
          <p> <i id="paragraphing_small"> "{name}" </i> </p>
          <textarea id="edit_input_small" onChange={handle_name} ></textarea>
          <h3> Image of Contributor </h3>
          <input type="file" className="image_input" id="file-input" name="ImageStyle" onChange={handle_image}/>
          <p> <br /> </p>
          <h3> Area of Expertise: </h3>
          <p> <i id="paragraphing_small"> "{aoe}" </i> </p>
          <textarea id="edit_input" onChange={handle_aoe}></textarea>
          <h3> Flavour Text: </h3>
          <p> <i id="paragraphing_small"> "{text}" </i> </p>
          <textarea id="edit_input" onChange={handle_text}></textarea>
          <h3> Cardiff People's Link: </h3>
          <p> <i id="paragraphing_small"> "{link}" </i> </p>
          <textarea id="edit_input_small" onChange={handle_link}></textarea>
        </div>
      </div>
      <button type="button" id="delete_button" onClick={check_delete}> Delete Contributor </button>
      <button type="button" id="save_button" onClick={save_changes}> Save Changes </button>
      <button type="button" id="cancel_button" onClick={cancel_changes}> Cancel Changes </button>
      <br /> <br /> <br /> <br /> <br />
      <footer>
        <p id="footer"> Website designed for the card game: Mind The Gap </p>
      </footer>
    </body>
  );
};

export default EditContributor;
