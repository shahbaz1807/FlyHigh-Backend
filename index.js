import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
// import notesRoute from './routes/notesRoute.js';
import profileRoute from './routes/profileRoute.js'
import cors from 'cors';

dotenv.config(); 
connectDB();

const app  =  express();
const port = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(cors());


app.get('/' , (req , res) => {
    res.send('wellcome to fly high')
})

// app.use('/api/notes' , notesRoute)
app.use('/api/auth' , profileRoute)

app.listen(port , ()=>{
    console.log(`Server is runing on port http://localhost:${port}/`);
})
