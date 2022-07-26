import React,{useContext} from 'react'
import ContextNote from "../context/notes/ContextNote";


export default function ViewNote() {
    const Context = useContext(ContextNote);
    const {viewNote} = Context;
  return (
    <div>
        <h1 style={{fontSize:"3rem"}} >{viewNote.title}</h1>
        <p className="my-4" style={{fontSize:"1rem"}}>{viewNote.description}</p>
    </div>
  )
}
