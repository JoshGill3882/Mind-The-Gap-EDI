import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import Login from "./components/eng_pages/Login";
import Home from "./components/eng_pages/Home";
import Search from "./components/eng_pages/Search";
import Rules from "./components/eng_pages/Rules";
import AboutUs from "./components/eng_pages/AboutUs";
import Card from "./components/eng_pages/Card"

import AdminHome from "./components/admin_pages/AdminHome";
import ViewComments from "./components/admin_pages/ViewComments";
import EditRules from "./components/admin_pages/EditRules";
import AddRule from "./components/admin_pages/AddRule";
import EditRule from "./components/admin_pages/EditRule";
import EditCards from "./components/admin_pages/EditCards";
import AddCard from "./components/admin_pages/AddCard";
import EditCard from "./components/admin_pages/EditCard";
import EditContributors from "./components/admin_pages/EditContributors";
import AddContributor from "./components/admin_pages/AddContributor";
import EditContributor from "./components/admin_pages/EditContributor";

import Mewngofnodi from "./components/cym_pages/Mewngofnodi"
import Hafan from "./components/cym_pages/Hafan"
import Chwilio from "./components/cym_pages/Chwilio"
import Rheolau from "./components/cym_pages/Rheolau"
import AmdanomNi from "./components/cym_pages/AmdanomNi"
import Cerdyn from "./components/cym_pages/Cerdyn"

import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/card" element={<Card />} />
        <Route path="/login" element={<Login />} />

        <Route path="/hafan" element={<Hafan />} />
        <Route path="/chwilio" element={<Chwilio />} />
        <Route path="/rheolau" element={<Rheolau />} />
        <Route path="/amdanom_ni" element={<AmdanomNi />} />
        <Route path="/cerdyn" element={<Cerdyn />} />
        <Route path="/mewngofnodi" element={<Mewngofnodi />} />


        <Route path="/admin" element={(<PrivateRoute><AdminHome /> </PrivateRoute>)} />
        <Route path="/view_comments" element={(<PrivateRoute><ViewComments /> </PrivateRoute>)} />
        <Route path="/edit_rules" element={(<PrivateRoute><EditRules /> </PrivateRoute>)} />
        <Route path="/add_rule" element={(<PrivateRoute><AddRule /> </PrivateRoute>)} />
        <Route path="/edit_rule" element={(<PrivateRoute><EditRule /> </PrivateRoute>)} />
        <Route path="/edit_cards" element={(<PrivateRoute><EditCards /> </PrivateRoute>)} />
        <Route path="/add_card" element={(<PrivateRoute><AddCard /> </PrivateRoute>)} />
        <Route path="/edit_card" element={(<PrivateRoute><EditCard /> </PrivateRoute>)} />
        <Route path="/edit_contributors" element={(<PrivateRoute><EditContributors /> </PrivateRoute>)} />
        <Route path="/add_contributor" element={(<PrivateRoute><AddContributor /> </PrivateRoute>)} />
        <Route path="/edit_contributor" element={(<PrivateRoute><EditContributor /> </PrivateRoute>)} />


        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>


  );
}

export default App;
