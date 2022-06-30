import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';
const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" });
    const Handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    const Handlechange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container my-3'>
                <h1> Add a note</h1>
                <form className='my-3'>
                    <div className="mb-3 my-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={Handlechange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={Handlechange} />
                    </div>
                    <div className="mb-3 my-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={Handlechange} />
                    </div>
                    <button type='submit' className='btn btn-primary' onClick={Handleclick}>Add</button>
                </form>
            </div>
        </div>

    )
}

export default AddNote
