require("dotenv").config({ path: "./config/config.env" });
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const app = express()
const auth=require("./middlewares/auth")
const connectDb = require("./config/db")
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json())
app.use(morgan("tiny"))
app.use(require("cors")())

//routes
app.use("/api",require("./Routes/auth"))
app.use("/api",require("./Routes/Contact"))

app.get('/protected',auth,(req,res)=>{
    return res.status(200).json({...req.user._doc})
})
app.get('/', (req, res) => {
    res.send("Server is running")
})
//sever configuration
app.listen(PORT, async () => {
    try {
        await connectDb()
        console.log(`server is running on ${PORT}`)

    } catch (error) {
        console.log(error)

    }

})