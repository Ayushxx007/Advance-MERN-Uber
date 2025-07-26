const express =require('express');
const app = express();
const cors=require('cors');
const dotenv = require('dotenv');
const helmet=require("helmet");
const connectDB = require('./db/db.js');
const router=require("./routes/user.routers.js");

var cookieParser = require('cookie-parser')




dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

const port =process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
    connectDB();
});

app.use("/users",router);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});






