import React, { useContext,useEffect } from "react";
import ContextNote from "../context/notes/ContextNote";
import NoteElements from "./NoteElements";

export default function Notes() {
  const Context = useContext(ContextNote);
  const { notes,getAllNotes } = Context;
  useEffect(() => {
    getAllNotes()
  }, [notes])
  
  return (
    <div>
      <h1>All notes</h1>
      <div className="row">
        {notes.map((note) => {
          return (
            <div className="col-md-3">
              <NoteElements key={note._id} note={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
