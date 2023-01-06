const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'b3947f6a4936fd' , 
    host: 'us-cdbr-east-04.cleardb.com',
    password: 'a93af4a4',
    database: 'heroku_042c22fc17aefd4',
});


var nameEntered ="";

app.post('/create', (req , res) => {
    const name = req.body.name;
    const institution = req.body.institution;
    const rate = req.body.rate;
    const comment = req.body.comment;

    db.query('INSERT INTO Partners (name, institution, rate, comment) VALUES (?,?,?,?)', 
    [name,institution,rate,comment],
    (err,result) => {
        if (err){
            console.log(err);
        }else{
            res.send("Values inserted");
        }
    } );
});

app.post('/name', (req , res) => {
    nameEntered = req.body.nameEntered;
});

app.get('/Partners', (req,res) => {
    db.query("SELECT * FROM Partners WHERE name = ?",[nameEntered], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    });
});


app.listen(process.env.PORT || PORT , () => {
    console.log("Server running on port ${PORT} ");
});

