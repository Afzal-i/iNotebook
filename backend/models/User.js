//connecting to mongodb
const mongoose = require('mongoose');
//user schema code from mongoosejs.com
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', UserSchema);
//User.createIndexes(); // THis command will create unique index for the fields where unique is used. here we have used in email.
module.exports = User //it require model name which is User in this case and in second argument we need a schema here schema name is Userschema