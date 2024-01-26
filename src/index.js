// index.js
require("dotenv").config();
// index.js
const express = require('express');
const http = require('http');
const cors= require('cors');
const Database = require('./mongodb/connection');
const Server = require('./server');
const mainRoute=require("./routes/mainRoute")

const app = express();
app.use(cors())
const server = http.createServer(app);

const database = new Database(process.env.MONGODB_URI);


app.use(express.json()); 

app.use('/',mainRoute);

database.connect()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server listening on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Exiting due to MongoDB connection error:', error.message);
    process.exit(1);
  });
