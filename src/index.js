// Required External Modules
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

// Required App Modules
import { connectDB } from "./config/database.js";
import routes from "./routes/routes.js";

// Required Route Modules

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true,
    // Other CORS options as needed
  })
);

// App Configuration
app.use(bodyParser.json()); //Adjust the limit as needed
app.use(cookieParser());

// MongoDB Connection
connectDB();

// Routes
app.use('/api',routes);

app.get("/api/healthcheck",(req,res)=>{
    return res.status(200).json("Hello world!, I am Bookstore server.");
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
