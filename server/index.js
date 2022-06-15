import app from "./app.js"
import { connectDB } from "./db.js";




connectDB()

app.listen(4000);
console.log('El servidor esta corriendo en el puerto', 4000)