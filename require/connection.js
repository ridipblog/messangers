// const DB=process.env.DATABASE;
// const mongoose=require('mongoose');
// mongoose.connect(DB,{
// 	useNewUrlParser:true,
// 	useCreateIndex:true,
// 	useUnifiedTopology:true
// });
const DB = process.env.DATABASE;
const mongoose = require("mongoose");

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,

    // version: ServerApiVersion.v1,
    // strict: true,
    // deprecationErrors: true,
  })
  .then(() => {
    console.log("Connection Secured");
  });
