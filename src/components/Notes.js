import React, { useContext,useEffect,useRef,useState } from "react";
import ContextNote from "../context/notes/ContextNote";
import InsertNotes from "./InsertNotes";
import NoteElements from "./NoteElements";
import { useNavigate } from 'react-router-dom';


export default function Notes() {
    let navigate = useNavigate();
  const Context = useContext(ContextNote);
  const { notes,getAllNotes,updateNote } = Context;
  useEffect(() => {
    getAllNotes()
  }, [notes])


const [note, setnote] = useState({id:"",Utitle:"",Udescription:""})

// click on update button
  const click_update=()=>{
    updateNote(note.id,note.Utitle,note.Udescription)
    Refclosemodal.current.click()
}


const change_state_title=(e)=>{
    // setnote({...note,[e.target.name]:e.target.value})
    setnote({id:note.id,Utitle:e.target.value,Udescription:note.Udescription})
}
const change_state_des=(e)=>{
    // setnote({...note,[e.target.name]:e.target.value})
    setnote({id:note.id,Utitle:note.Utitle, Udescription:e.target.value})
}

  const ref = useRef(null)
  const Refclosemodal = useRef(null)
  const update_icon_click=(current)=>{

      ref.current.click()
      setnote({id:current._id,Utitle:current.title, Udescription:current.description})
  }
  return (
    <div>
      
   <InsertNotes/>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Notes</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
        <label htmlfor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          minLength={2}
          className="form-control"
          value={note.Utitle}
          id="update_title"
          name="update_title"
          onChange={change_state_title}
        />
      </div>
      <div className="mb-3">
        <label htmlfor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          minLength={5}
          className="form-control"
          id="update_description"
          name="update_description"
          value={note.Udescription}
          rows="5"
          onChange={change_state_des}
        ></textarea>

      </div>
      </div>
      <div className="modal-footer">
        <button ref={Refclosemodal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.Utitle.length<2 || note.Udescription.length<5} type="button" className="btn btn-primary" onClick={click_update}>Save changes</button>
      </div>
    </div>
  </div>
</div>



      <h1>All notes</h1>
      <div className="row">
      {notes.length===0 && <div className="conatiner my-3">No Notes to display</div>}
        {notes.map((note) => {
          return (
            <div className="col-md-4">
              
              <NoteElements key={note._id}  update_icon_click={update_icon_click} note={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
