const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({
    //storing user id in notes to ensure the owner of the notes is only accesing the notes
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    tags:{
        type: String,
        default: "general"
    },
    date: { type: Date, default: Date.now },
    }
  );
  module.exports = mongoose.model('notes', NotesSchema);