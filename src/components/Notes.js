import noteContext from '../context/notes/noteContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
//import { click } from '@testing-library/user-event/dist/click';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);
  const ref = useRef(null)
  const refClose=useRef(null)
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etags: "" });
  
  const updateNote = (currentNote) => {
    ref.current.click()
    editNote(note.id, note.etitle, note.edescription, note.etags)
    //editNote(note.id,note.etitle, note.edescription,note.etags )
    setNote({id:currentNote._id ,etitle:currentNote.title, edescription:currentNote.description, etags:currentNote.tags})
  }

  const Handleclick = (e) => {
    console.log(note)
    //setNote({ title: "", description: "", tags: "" })
    refClose.current.click();
}

const Handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
   
}
  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3 my-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={Handlechange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={Handlechange} />
                </div>
                <div className="mb-3 my-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">tags</label>
                  <input type="text" className="form-control" id="etags" name="etags" value={note.etags} onChange={Handlechange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}  type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={Handleclick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes
