import React from "react";
import ContextNote from "./ContextNote"
import { useState } from "react";

const host='http://localhost:5000'
const StateNote=(props)=>{
    let m=[]
      const [notes, setnotes] = useState(m)
      const [viewNote, setviewNote] = useState({title:"",description:""})

      //   get notes
      const getAllNotes=async ()=>{
        // api call
        const data=await fetch('http://localhost:5000/api/notes/getallnotes',{
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'authentication-token':localStorage.getItem('token')
          },
          // body:JSON.stringify({title,description,tag})
        })
        const jsonData=await data.json()
        // console.log(jsonData)
        setnotes(jsonData)
      }



    //   insert notes
    const insertNote = async (title, description) => {
      // TODO: API Call
      // API Call 
      // console.log(title,description,tag)
      const data=await fetch('http://localhost:5000/api/notes/addnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "authentication-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
          "title":`${title}`,
          "description":`${description}`
      })
      })
  
      const note = await data.json();
      
      setnotes(notes.concat(note.note))
    }


    // delete notes
      const deleteNote= async (note_id)=>{
        await fetch(`${host}/api/notes/deletenote/${note_id}`,{
          method:'DELETE',
          headers:{
            'content-type':'application/json',
            'authentication-token':localStorage.getItem('token')
          },
        })
      }



    //update notes
    const updateNote=async (note_id,title,description)=>{
      console.log()
      // api call
      await fetch(`${host}/api/notes/updatenote/${note_id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
          'authentication-token':localStorage.getItem('token')
        },
        body:JSON.stringify({
          "title":`${title}`,
          "description":`${description}`
        })
      })
      // const json_data=data.json()
      for(let i=0;i<notes.length;i++){
        if(notes[i]._id===note_id){
          notes[i].title=title
          notes[i].description=description
          break;
        }
      }
    }

    return(
        <ContextNote.Provider value={{notes,insertNote,deleteNote,updateNote,getAllNotes,viewNote,setviewNote}}>
            {props.children}
        </ContextNote.Provider>
    )
}
export default StateNote