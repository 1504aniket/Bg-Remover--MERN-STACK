import 'dotenv/config'
import express from "express"
import cors from 'cors'
import connectDB from './configs/mongodb.js';
import userRouter from './route/userRoute.js';


const PORT=4000;
const app=express();
 connectDB()



app.use(express.json())
app.use(cors())



app.get('/',(req,res)=>{
    res.send('API is working');



})

app.use('/api/user',userRouter)


app.listen(PORT,()=>console.log('Server running on port',PORT ))

