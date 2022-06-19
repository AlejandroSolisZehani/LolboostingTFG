import app from "./app.js"
import { connectDB } from "./db.js";

var port = process.env.port || 8000


connectDB()

app.listen(port, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
  });
console.log('El servidor esta corriendo en el puerto', port)