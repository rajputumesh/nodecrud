const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql@123",
    database: "mynodedb",
    port: "3306"
});
  
con.connect(function(err) {
    if (err) throw console.log('error = ',err);
    console.log("Connected!");
});

const port = process.env.PORT || 5000;

app.set('view engine','ejs');
app.get('/',(req, res)=>{
    res.render('base',{title:"my app"});
});

app.get('/user',(req, res)=>{
    con.query('select * from users', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      });
});

app.post('/user',(req, res)=>{
    var params  = req.body;
    console.log(params);
    con.query('INSERT INTO users SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.get('/user/:id',(req, res)=>{
    con.query('select * from users where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      });
});

app.put('/user/:id',(req, res)=>{
    con.query('UPDATE `users` SET `name`=?,`phone`=?,`email`=?,`password`=? where `id`=?', [req.body.name,req.body.phone, req.body.email, req.body.password, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.delete('/user/:id',(req, res)=>{
    con.query('DELETE FROM `users` WHERE `id`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
      });
});

app.listen(port);