import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []


  const [notes, setNotes] = useState(notesInitial);

  //Get all note
  const getNotes =async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMTdlMDY5MDg1M2I1NmFiODFkOWRlIn0sImlhdCI6MTY1NTg3MzA3Nn0.E25sy_35P93SCmCgdoqQIAdiZggR5eL6h6x7eiNLv-4"
      }

    });
    const json= await response.json()
    //console.log(json)
    setNotes(json);


  }

  //Add a note
  const addNote =async (id, title, description, tag) => {
    console.log(id)
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMTdlMDY5MDg1M2I1NmFiODFkOWRlIn0sImlhdCI6MTY1NTg3MzA3Nn0.E25sy_35P93SCmCgdoqQIAdiZggR5eL6h6x7eiNLv-4"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json= await response.json();
    //console.log(json)
    const note =
    {
      "_id": "0001",
      "title": title,
      "description": description,
      "tags": tag,
      "date": "2022-06-22T07:29:02.703Z",
      "__v": 0
    };
    //console.log(notes)
    setNotes(notes.concat(note));


  }
  //Delete a note
  const deleteNote = async (id) => {
    console.log(id)
    //API call
    const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMTdlMDY5MDg1M2I1NmFiODFkOWRlIn0sImlhdCI6MTY1NTg3MzA3Nn0.E25sy_35P93SCmCgdoqQIAdiZggR5eL6h6x7eiNLv-4"
    }
  });
  const json=response.json()
  //console.log(json)
  const newNotes=notes.filter((note)=>{return note._id !== id})
  setNotes(newNotes)

  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    console.log(id)
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMTdlMDY5MDg1M2I1NmFiODFkOWRlIn0sImlhdCI6MTY1NTg3MzA3Nn0.E25sy_35P93SCmCgdoqQIAdiZggR5eL6h6x7eiNLv-4"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
    }

  }
  setNotes(newNotes);
}

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState