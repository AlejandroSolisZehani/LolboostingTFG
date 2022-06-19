import express from "express";
import postsRoutes from "./routes/routes.js"
import {dirname, join} from "path"
import {fileURLToPath} from "url"
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.use(postsRoutes)
console.log(__dirname)
app.use(express.static(join(__dirname, '../lolboosting/build')))
app.get('*', (req, res) =>{
    res.sendFile(join(__dirname, '../lolboosting/build/index.html'))
})
export default app