const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');//This help in accessing port 5000 from port 3000
connectToMongo();
const app = express()
const port = 5000

app.use(cors()); //This help in accessing port 5000 from port 3000
app.use(express.json())
//Available routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Backend - iNotebook on port ${port}`)
})