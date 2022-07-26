import React from "react";
import ContextNote from "../context/notes/ContextNote";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function NoteElements(props) {
  const { note,update_icon_click,showalert } = props;
  const Context = useContext(ContextNote);
  const { deleteNote,viewNote,setviewNote } = Context;
  const clickView=(note)=>{
      setviewNote({title:note.title,description:note.description})
      console.log(viewNote)
      document.getElementById('view').to='/view'
  }

  const del_note=(note_id)=>{
    if(window.confirm('Do you want to delete?')){
      deleteNote(note_id)
      showalert("Notes deleted")

    }
  }
  const update_note=(note)=>{
    update_icon_click(note)
  }
  return (
    <div className="my-3" >
      <div className="card" style={{ height:"10rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title.slice(0,30)}</h5>
          <p className="card-text" style={{height:"4rem"}}>{note.description.slice(0,90)}  </p>
          <div className="my-1">
          <i className="fa fa-trash mx-2" style={{fontSize:"22px"}} onClick={()=>{del_note(note._id)}}></i>
          <i className="fa fa-edit mx-2" style={{fontSize:"22px"}} onClick={()=>{update_note(note)}}></i>
          <Link id="view" to="/view"  style={{textDecoration:"none"}} onClick={()=>{clickView(note)}}><i className="fa fa-eye mx-2" style={{fontSize:"22px",color:"black"}} ></i></Link>
          </div>

          
        </div>
      </div>
    </div>
  );
}
