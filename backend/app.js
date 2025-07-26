const express =require('express');
const app = express();
const cors=require('cors');
const dotenv = require('dotenv');




dotenv.config();
app.use(cors());

const port =process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


