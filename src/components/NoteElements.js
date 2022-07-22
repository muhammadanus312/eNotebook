import React from "react";
import ContextNote from "../context/notes/ContextNote";
import { useContext } from "react";

export default function NoteElements(props) {
  const { note,update_icon_click } = props;
  const Context = useContext(ContextNote);
  const { deleteNote } = Context;
  return (
    <div className="my-3" >
      <div className="card" style={{ height:"10rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title.slice(0,30)}</h5>
          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
          <p className="card-text" style={{height:"4rem"}}>{note.description.slice(0,90)}  </p>
          <i className="fa fa-trash mx-2" style={{fontSize:"20px"}} onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa fa-edit mx-2" style={{fontSize:"20px"}} onClick={()=>{update_icon_click(note)}}></i>
          
        </div>
      </div>
    </div>
  );
}
