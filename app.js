const express=require('express');
const app=express();
const router=require('./routes/tasks');

const port=3000||process.env.PORT;

const connectDB=require('./db/connect');
const notFound=require('./middleware/NotFound');
const erroHandlerMiddlware=require('./middleware/ErrorHandler');
require('dotenv').config();


app.use(express.static('./public'));

app.use(express.json());
app.get('/hello',(req,res)=>{
    res.send('home page...');
})


app.use('/api/v1/tasks',router);

app.use(notFound);
app.use(erroHandlerMiddlware);
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server Is Listening ${port} ...`);
        })

    } catch (error) {
        console.log(error);
    }
}
start();

