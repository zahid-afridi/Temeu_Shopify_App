import mongoose from "mongoose";

const DbCon=async()=>{
    try {
        // await mongoose.connect('mongodb://localhost:27017/AliExpress')
        await mongoose.connect('mongodb+srv://zahid:zahid313@cluster0.7kqkz.mongodb.net/AliExpress')


console.log("Mongo db is conncted")
    } catch (error) {
        console.log(error)
    }
}
export default DbCon