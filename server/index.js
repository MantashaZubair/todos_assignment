const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());


app.post("/todos", async (req, res) => {
    const { todo_name } = req.body;
    const sql = `INSERT INTO todolists (todo_name) VALUES (?);`;
    db.query(sql, [todo_name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log("saved data");
        res.status(200).json(result);
    });
});

app.get("/todos/get", (req, res) => {
    const sqlSelect = "SELECT * FROM todolists";
    db.query(sqlSelect, (err, result, fields) => {
        console.log("data received");
        console.log(result);
        return res.json({ data: result });
    });
});

app.delete("/todos/delete/:todo_id", (req,res)=>{
    const todo_id= req.params.todo_id;
    const sql = `DELETE FROM todolists WHERE todo_id=?`
    db.query(sql,todo_id ,(err,result)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json({ success:true, result });
    })
})

app.listen(port, () => {
    console.log(`server run at localhost on port ${port}`);
});





// // app.get("/", (req,res)=>{
// //     const sql =
// //     "INSERT INTO todolists ( todoitem) VALUES ('marketting')"
// //     db.query(sql,(err,result)=>{
// //         res.send("hello")
// //     })
// // })

// app.post("/db", async (req, res) => {
//     const { todo_name } = req.body;
//     const sql = `INSERT INTO todolists (todo_name) VALUES (?);`;
//     db.query(sql, [todo_name], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         console.log("saved data");
//         res.status(200).json(result);
//     });
// });

// app.get("/db/get", (req, res) => {
//     const sqlSelect = "SELECT * FROM todolists";
//     db.query(sqlSelect, (err, result, fields) => {
//         console.log("data received");
//         console.log(result);
//         return res.json({ data: result });
//     });
// });
// // app.delete("/db/delete/:id", (req,res)=>{
// //     const {id} = req.params;
// //     const sql = `DELETE FROM todos.todolists WHERE todo_id=?`
// //     db.query(sql,(err,[id],result)=>{
// //         if (err) {
// //             return res.status(500).json({ error: err.message });
// //         }
// //         console.log("deleted")
// //         return res.json({ success:true, result });
// //     })
// // })

// app.listen(port, () => {
//     console.log(`server run at localhost on port ${port}`);
// });

