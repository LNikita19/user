import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./component/Home/Home";
// import Footer from "./component/Footer";
// import Navbar from "./component/Navbar";
// import About from "./component/About/about";
// import Activities from "./component/Activities/Activities";
// import AdmissionPage from "./component/Admission/admissionPage";
// import Contact from "./component/Contact/Contact";
// import Newsletter from "./component/Newsletter";
// import MyForm from "./component/Test";
import Navbar from "./component/Navbar";
import About from "./component/About";
import Footer from "./component/Footer";
import PopupProgram from "./component/program/PopupProgram";
import Programs from "./component/programs";
import OnlineClass from "./component/OnlineClass";
import Testimonials from "./component/Testimonials";
import ImageSlider from "./component/Images";
function App() {
  return (<div className="">
    <Navbar />
    {/* <PopupProgram /> */}
    <About />
    <Programs />
    <OnlineClass />
    <Testimonials />
    <ImageSlider />
    <Footer />


  </div>
  );
}

export default App;
