import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import About from "./component/About";
import Footer from "./component/Footer";
import PopupProgram from "./component/program/PopupProgram";
import Programs from "./component/programs";
import OnlineClass from "./component/OnlineClass";
import Testimonials from "./component/Testimonials";
import ImageSlider from "./component/Images";
import Author from "./component/Author";
import Privacypolicy from "./component/Privacypolicy";

function Home() {
  return (
    <>
      <Navbar />
      <About />
      <Programs />
      <OnlineClass />
      <Author />
      <Testimonials />
      <ImageSlider />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
