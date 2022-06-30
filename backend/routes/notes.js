//here we have to use router and for that we need express hence importing express
const express = require('express');
//importing router 
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//const Note = require('../models/Note');
//whatever written after /api/auth will be used from below code as we are not ussing anythhing after /api/auth here we will be passing empty strting i.e '/'
//next path will be a call back function with req-request and res-response 

//Route 1: Get all the notes using GET method on "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id })
        //sending obj in res-response
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error 505, something went wrong")
    }
})


//Route 2: Adding a new note using Post method on "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter atleast 5 letters').isLength({ min: 5 }),
    body('description', 'nter atleast 5 letters').isLength({ min: 5 })
], async (req, res) => {

    try {

        const { title, description, tags } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }
        const note = new Note({
            title, description, tags, user: req.user.id
        });
        const savedNote = await note.save()
        //sending obj in res-response
        res.json(savedNote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error 505, something went wrong")
    }
})

//Route 3: updating a new note using Put method on "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tags } = req.body;
    //creating a new object
    try {

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tags) { newNote.tags = tags };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);  // id that will be updated in router.put request
        if (!note) {
            console.log("note")
            return res.status(404).send("Not Found")
        }

        //Finding the right user
        if (note && note.user && note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Authorized")
        }
        //now after authorizing the user , updating the notes
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Route 4: Deleting a new note using delete method on "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {


        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);  // id that will be updated in router.put request
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //Finding the right user
        if (note && note.user && note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Authorized")
        }
        //now after authorizing the user , updating the notes
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note:note})
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }

})


module.exports = router