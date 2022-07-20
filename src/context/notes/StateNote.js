import React from "react";
import ContextNote from "./ContextNote"
import { useState } from "react";

const host='http://localhost:5000'
const StateNote=(props)=>{
    const m=[
        
      ]
      const [notes, setnotes] = useState(m)

      //   get notes
      const getAllNotes=async ()=>{
        // api call
        const data=await fetch('http://localhost:5000/api/notes/getallnotes',{
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'authentication-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDk0OTc2MWEzODZlNGUzNzA4YWUxIn0sImlhdCI6MTY1NzkzMzcwNX0.hhJ7CDtCegzlbxl_VDFrjQci0JQL8XSaIrowcV2jENs'
          },
          // body:JSON.stringify({title,description,tag})
        })
        const jsonData=await data.json()
        // console.log(jsonData)
        setnotes(jsonData)
      }



    //   insert notes
    const insertNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authentication-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDk0OTc2MWEzODZlNGUzNzA4YWUxIn0sImlhdCI6MTY1NzkzMzcwNX0.hhJ7CDtCegzlbxl_VDFrjQci0JQL8XSaIrowcV2jENs"
        },
        body: JSON.stringify({title, description, tag})
      });
  
      const note = await response.json();
      console.log(note)
      setnotes(notes.concat(note))
    }


    // delete notes
      const deleteNote= async (note_id)=>{
        const data=await fetch(`${host}/api/notes/deletenote/${note_id}`,{
          method:'DELETE',
          headers:{
            'content-type':'application/json',
            'authentication-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDk0OTc2MWEzODZlNGUzNzA4YWUxIn0sImlhdCI6MTY1NzkzMzcwNX0.hhJ7CDtCegzlbxl_VDFrjQci0JQL8XSaIrowcV2jENs'
          },
          // body:JSON.stringify({note_id})
        })
        // const json_data=data.json()
      }



    //update notes
    const updateNote=async (note_id,title,description,tag)=>{
      // api call
      const data=await fetch(`${host}/api/notes/updatenote/${note_id}`,{
        method:'POST',
        headers:{
          'content-type':'application/json',
          'authentication-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDk0OTc2MWEzODZlNGUzNzA4YWUxIn0sImlhdCI6MTY1NzkzMzcwNX0.hhJ7CDtCegzlbxl_VDFrjQci0JQL8XSaIrowcV2jENs'
        },
        body:JSON.stringify(({title,description,tag}))
      })
      const json_data=data.json()
      notes.forEach(element => {
        if(element._id===note_id){
          element.title=title
          element.description=description
          element.tag=tag
        }
      });
    }

    return(
        <ContextNote.Provider value={{notes,insertNote,deleteNote,updateNote,getAllNotes}}>
            {props.children}
        </ContextNote.Provider>
    )
}
export default StateNote