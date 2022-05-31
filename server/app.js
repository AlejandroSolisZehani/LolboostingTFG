import express from "express";
import postsRoutes from "./routes/routes.js"
const app = express();
//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.use(postsRoutes)

export default app