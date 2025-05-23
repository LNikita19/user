import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./component/Navbar";
import About from "./component/About";
import Footer from "./component/Footer";
import PopupProgram from "./component/program/PopupProgram";
import Programs from "./component/programs";
import OnlineClass from "./component/OnlineClass";
import Testimonials from "./component/Testimonials";
import ImageSlider from "./component/Images";
import Author from "./component/Author";
function App() {
  return (<div className="">
    <Navbar />
    {/* <PopupProgram /> */}
    <About />
    <Programs />
    <OnlineClass />
    <Author />
    <Testimonials />
    <ImageSlider />
    <Footer />


  </div>
  );
}

export default App;
