import app from "./app.js"
import { connectDB } from "./db.js";

var port = process.env.port || 4000


connectDB()

app.listen(port);
console.log('El servidor esta corriendo en el puerto', port)