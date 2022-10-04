const express = require('express');
const { body, validationResult } = require('express-validator');
const routes = express.Router();
const fetchuser = require('../middleware/fetchuser'); // For fetching the logged in user detail
const Note = require('../models/Notes'); //For adding notes 

//Route 1: Get all the notes using GET: '/api/notes/fetchallnotes ' .  Login is required for this
routes.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); // To find notes of the logged in user
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: "Internal server error occured." });
    }
})

//Route 2: Add new note using POST: '/api/notes/addnote ' . Login is required for this
routes.post('/addnote', fetchuser, [
    body('title', 'Please enter a title').isLength({ min: 3 }),
    body('description', 'Please enter a description').isLength({ min: 7 })
], async (req, res) => {
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
    }
    const { title, description, tags } = req.body;
    try {
        const note = new Note({
            title, description, tags, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: "Internal server error occured." });
    }
})

//Route 3: Update existing note using PUT: '/api/notes/updatenote ' . Login is required for this
routes.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tags) { newNote.tags = tags };

        //To ensure if the note exists
        let note = await Note.findById(req.params.id); //req.params.id pass the id passed in the url
        if (!note) {
            return res.status(404).sendStatus("Note not found")
        }

        //To ensure if the owner of the note is only editing the note
        if (note.user.toString() != req.user.id) {
            return res.status(401).sendStatus("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);

    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: "Internal server error occured." });
    }
})

//Route 4: Delete note using DELETE: '/api/notes/deletenote ' . Login is required for this
routes.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //Find note
    let note = await Note.findById(req.params.id)
    try {
        if (!note) {
            return res.status(404).sendStatus("Note not found")
        }

        //To ensure if the owner of the note is only editing the note
        if (note.user.toString() != req.user.id) {
            return res.status(401).sendStatus("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ success: "Note successfully deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: "Internal server error occured." });
    }
})
module.exports = routes