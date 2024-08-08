import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import userRoutes from "./routes/user-routes.js"
import dotenv from "dotenv";
dotenv.config

const app = express()
const port = 5000

app.use(bodyParser.json());

app.use(express.json());
app.use(cors())

app.use(userRoutes)
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

