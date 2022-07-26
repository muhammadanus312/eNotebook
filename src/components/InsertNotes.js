import React,{useState,useEffect} from "react";
import ContextNote from "../context/notes/ContextNote";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

export default function InsertNotes(props) {
    const Context = useContext(ContextNote);
  const {insertNote } = Context;

const [note, setnote] = useState({title:"",description:""})
let navigate = useNavigate();

useEffect(() => {
  if(localStorage.getItem('token')===null){
    navigate('/signin');
  }
}, [])
  const click_submit=()=>{
        insertNote(note.title,note.description)
        props.showalert("Notes saved")
        document.getElementById('title').value=""
        document.getElementById('description').value=""
  }
  const change_state=(e)=>{
        setnote({...note,[e.target.name]:[e.target.value]})
  }
  return (
    <div>
        <h1>Take Notes</h1>
      <div className="mb-3">
        <label htmlfor="exampleFormControlInput1" className="form-label">
         <h3 className="my-2"> Title</h3>
        </label>
        <button type="button" className="btn btn-primary my-3 float-end" onClick={click_submit}>Save Notes</button>

        <input
          required
          minLength={2}
          type="text"
          className="form-control"
          id="title"
          name="title"
          onChange={change_state}
        />
      </div>
      <div className="mb-3">
        <label htmlfor="exampleFormControlTextarea1" className="form-label">
          <h3>Notes</h3>
        </label>
        <textarea
          required
          minLength={5}
          className="form-control"
          id="description"
          name="description"
          rows="15"
          onChange={change_state}
        ></textarea>
          <button type="button" className="btn btn-primary my-3" onClick={click_submit}>Save Notes</button>


      </div>
    </div>
  );
}
