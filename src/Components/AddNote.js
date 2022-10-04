import React, {useContext, useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote, showAlert} = context;
    
    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const onChange = (e) =>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("success", "Note added succesfully")
        setNote({title: "", description: "", tag: ""})
    }
    return (
        <form>
            <div className="form-group my-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title}  onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="form-group my-3">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
            </div>
            <div className="form-group my-3">
                <label htmlFor="tags">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
            </div>
            <button disabled={note.title.length<5 || note.description.length<5 }type="submit" className="btn btn-primary mt-3 mb-5" onClick={handleClick}>Add Note</button>
        </form>
    );
}

export default AddNote;
