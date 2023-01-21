const express = require("express")
const cors = require("cors")
const db = require("./config/db")

const app = express()
 app.use(cors())
 const port = 5000;
 app.use(express.json())
// app.get("/", (req,res)=>{
//     const sql =
//     "INSERT INTO todolists ( todoitem) VALUES ('marketting')"
//     db.query(sql,(err,result)=>{
//         res.send("hello")
//     })
// })



 app.post("/db", (req,res)=>{
    const {todo_name} = req.body;
    const sql =`INSERT INTO todolists (todo_name) VALUES (?)`;
       db.query(sql,[todo_name],(err,result)=>{
        if(err){
           return res.send(500).send(`404 Server Error/no connection ${err}`)
        }
        console.log("send data")
        res.json(result)
        
    })
 })
 app.get("/db/get",(req,res)=>{
    const sqlSelect ="SELECT * FROM todolists";
    db.query(sqlSelect, (err,result,fields)=>{
     console.log("data received")
    console.log(result)
    return res.json({data:result});
    
 })  
})

 app.listen(port , ()=>{
    console.log(`server run at localhost on port ${port}`)
 })