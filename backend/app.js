const express =require('express');
const app = express();
const cors=require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db.js');




dotenv.config();
app.use(cors());

const port =process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
    connectDB();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


