
var express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const cookieParser = require('cookie-parser')   
require('dotenv').config()
const expressValidator = require('express-validator')
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');



//db connection
const uri =`${ process.env.ATLAS_URI}`
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then((da)=>{
  console.log("DB connected");
}).catch((er)=>{
  console.log("not connect")
})

//app
const app = express();




//======>>>>>Middelware<<<<<<<==========//
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());



//routes middelware

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);



const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is runnig port ${port}`);

});









