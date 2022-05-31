import mongoose from "mongoose";

export async function connectDB(){
    try{
        const db= await mongoose.connect("mongodb+srv://Alejandro:52acpRXpUNOhnACz@lolboosting.wwta6.mongodb.net/Lolboosting?retryWrites=true&w=majority")
        console.log("Se ha conectado a", db.connection.name)
    }catch (error){
        console.error(error);
    }
}