//Index.js will be our express server
const express = require('express')
const connectToMongo= require('./db');
var cors = require('cors')
connectToMongo();

//boiler plate from express,js website

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())


//inorder to use req.body in another component then we need to add this middleware syntax


//Available Routes here auth and notes will be api we have created and ./auth and ./notes at the end of the sytax are route files
// here we will be using router hence using app.use while in the router file we will be using router.
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
