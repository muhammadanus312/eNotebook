import "./App.css";
import React,{useState,useEffect}  from 'react'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StateNote from "./context/notes/StateNote";
// import ContextNote from "./context/notes/ContextNote";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import ViewNote from "./components/ViewNote";
import Notes from "./components/Notes";
import InsertNotes from "./components/InsertNotes"

function App() {
useEffect(() => {
  if(localStorage.getItem('token')===undefined){
    localStorage.setItem('token',null)
  }
}, [])

  
  const[alert,setalert]=useState(null)
  // const Context = useContext(ContextNote);
  // const { viewNote} = Context;
  function showalert(msg,type){
    setalert({
      message:msg,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    },2000);
  } 
  return (
    // <div className="App">
     <div>
      <StateNote>
        <Router>
        <Navbar showalert={showalert}/>
      <Alert alert={alert}/>
       <div className="container">
       <Routes>
            <Route path="/" element={<InsertNotes showalert={showalert}/>}/>
            <Route path="/notes" element={<InsertNotes showalert={showalert}/>}/>
            <Route path="/yournotes" element={<Notes showalert={showalert}/>} />
            <Route path="/signin" element={<Signin showalert={showalert}/>} />
            <Route path="/signup" element={<Signup showalert={showalert}/>} />
            <Route path="/view" element={<ViewNote/>} />
        </Routes>
       </div>
        </Router>
        </StateNote>
      </div>
  );
}

export default App;
