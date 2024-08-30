import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute  from  "./routes/company.route.js"
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path"
import { log } from "console";
dotenv.config({})


const __dirname = path.resolve();

const app = express();



//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000;

//apis ayengi
app.use("/api/v1/user" , userRoute);
//http://localhost:8000/api/v1/user so iske aage (userRoute)user.route mein jayega and login , register, profile/update dhundega and get request hojayengi
app.use("/api/v1/company" , companyRoute);
app.use("/api/v1/job" , jobRoute);
app.use("/api/v1/application" , applicationRoute)

app.use(express.static(path.join(__dirname , "/frontend/dist")))
app.get("*" , (req, res)=>{
    res.sendFile(path.resolve(__dirname , "frontend" ,"dist" , "index.html"))
})

app.listen(PORT, () => {
    connectDb();
    console.log(`server running at port ${PORT}`);

})