var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Infos=require("../models/info.js")
var sd = require("silly-datetime");

mongoose.connect('mongodb://127.0.0.1:27017/auction')


mongoose.connection.on('connected',function(){
  console.log("MongoDB connected success.")
})


mongoose.connection.on('error',function(){
  console.log("MongoDB connected fail.")
})

mongoose.connection.on('disconnected',function(){
  console.log("MongoDB connected disconnected.")

})

router.get("/information",function(req,res,next){
  Infos.find({}, function (err,doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count:doc.length,
          list:doc
        }
      });
    }
  })
})

router.post("/addinfo",(req,res,next)=>{
  let infoma = {
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    date: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  };
  new Infos(infoma).save((err,doc)=>{
    if(err){
      console.log(err)
    }
    else{
      res.json({
          list: doc
      })
    }
  })
})


module.exports=router
