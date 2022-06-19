import app from "./app.js"
import { connectDB } from "./db.js";

const port = process.env.PORT || 8000

const host = '0.0.0.0';
connectDB()

app.listen(port, host, () => {
   console.log("App is running on port "+ port)
  });
console.log('El servidor esta corriendo en el puerto', port)