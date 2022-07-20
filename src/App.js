import "./App.css";
import React  from 'react'
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StateNote from "./context/notes/StateNote";

function App() {
  return (
    // <div className="App">
     <div>
      <StateNote>
        <Router>
        <Navbar/>
       <div className="container">
       <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/about" element={<About/>} />
        </Routes>
       </div>
        </Router>
        </StateNote>
      </div>
  );
}

export default App;
