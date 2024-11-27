import mongoose from "mongoose";

const DbCon=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/AliExpress')
console.log("Mongo db is conncted")
    } catch (error) {
        console.log(error)
    }
}
export default DbCon