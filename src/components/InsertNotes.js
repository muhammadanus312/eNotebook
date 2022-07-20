import React,{useState} from "react";
import ContextNote from "../context/notes/ContextNote";
import { useContext } from "react";

export default function () {
    const Context = useContext(ContextNote);
  const {insertNote } = Context;

const [note, setnote] = useState({title:"",description:"",tag:""})

  const click_submit=()=>{
        insertNote(note.title,note.description,note.tag)
  }
  const change_state=(e)=>{
        setnote({...note,[e.target.name]:[e.target.value]})
  }
  return (
    <div>
        <h1>Add Notes</h1>
      <div className="mb-3">
        <label htmlfor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          onChange={change_state}
        />
      </div>
      <div className="mb-3">
        <label htmlfor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="5"
          onChange={change_state}
        ></textarea>
          <button type="submit" className="btn btn-primary my-3" onClick={click_submit} >Submit</button>

      </div>
    </div>
  );
}