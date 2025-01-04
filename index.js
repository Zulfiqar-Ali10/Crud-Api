import express from "express";
import 'dotenv/config'
import morgan from "morgan";
import mongoose from "mongoose";
import bannerRoutes from "./routers/banner.js";
const cors = require('cors')

const app = express();
const PORT = 5000;


const corsOption = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    CredentialS: true,
    optionSuccessStatus: 204
};


// Enable CORS for all routes
app.use(cors(corsOption));


console.log("MONGODBURI=>", process.env.MONGODBURI);

app.use(morgan("tiny"));
app.use(express.json());


mongoose.connect(process.env.MONGODBURI)
.then(()=> console.log("Mongodb Connect"))
.catch((err)=> console.log("err", err));

// app.get('/', (req, res) => {
//     console.log("req=>" , req);
//     res.send("Hello world");
// })

app.use("/", bannerRoutes)

app.listen(PORT, ()=> console.log("PORT Is Running On Server" + PORT));
