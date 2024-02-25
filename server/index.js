import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";


const app = express();


app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/client_id', (req,res) => res.send({client_id: process.env.CLIENT_ID}));

const CONNECTION_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(()=> app.listen(PORT,() => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));