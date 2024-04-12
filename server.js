const express  = require('express');
const mongoose = require('mongoose')
const connectDB = require("./config/dbconfig")
const cors = require('cors');
const bodyParser = require('body-parser')
const authRouter = require("./routes/auth.router")
const usercheckRouter = require("./routes/userCheck.router")
const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

const PORT = 3001;

app.get('/',(req, res)=>{
    res.send('Hello we are at Home-Page of Dribbble')
})

app.use("/api/auth",authRouter);
app.use("/api/check",usercheckRouter );

mongoose.connection.once("open",()=>{
    console.log("Connected to DB")
    app.listen( process.env.PORT || PORT , ()=>{
        console.log(`Server is Up on ${PORT} and Running`);
    })
})
