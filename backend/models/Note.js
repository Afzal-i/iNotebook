//connecting to mongodb
const mongoose = require('mongoose');
//user schema code from mongoosejs.com
const {Schema}=mongoose;
const NotesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        default:"General"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  module.exports =mongoose.model('notes', NotesSchema); //it require model name which is User in this case and in second argument we need a schema here schema name is Notesschema