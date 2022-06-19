import app from "./app.js"
import { connectDB } from "./db.js";

const port = process.env.port || 8000


connectDB()

app.listen(port, () => {
   console.log("App is running on port "+ port)
  });
console.log('El servidor esta corriendo en el puerto', port)