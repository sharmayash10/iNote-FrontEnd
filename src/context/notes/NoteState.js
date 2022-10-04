import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  const [alertBody, setAlertBody] = useState({type: "", message: ""})

  //fteching notes from api 
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: 'GET',
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }

  //Add note in client side logic
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
    const newNote = await response.json();
    setNotes(notes.concat(newNote))
  }

  //Delete note in client side
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`,
      {
        method: 'DELETE',
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });
    console.log("Deleting note..." + id)
    const json = await response.json();
    console.log(json)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
    showAlert("success", "Deleted Successfully")
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
    const json = await response.json();
    console.log(json);

    //Edit note in client logic
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tags = tag;
        break;
      }
    }
    setNotes(newNote)
  }
  const showAlert = (type, message) => {
    //  alert (message);
    setAlertBody({
      "message" : message,
      "type" : type
    })
    setTimeout(()=>{
      setAlertBody({message: "", type:""})
    }, 1500)
  }
  return (
    <NoteContext.Provider value={{ getNotes, notes, setNotes, addNote, deleteNote, editNote, showAlert, alertBody }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState