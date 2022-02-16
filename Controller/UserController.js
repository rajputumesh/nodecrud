const con = require('../database');
const { validationResult } = require('express-validator');
//get all users
exports.index = (req, res)=>{
    con.query('select * from users', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      });
}

//store user data
exports.store = (req, res)=>{
    var params  = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    con.query('INSERT INTO users SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
}

//get single user
exports.edit = (req, res)=>{
    con.query('select * from users where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      });
}

//update user data
exports.update = (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    con.query('UPDATE `users` SET `name`=?,`phone`=?,`email`=?,`password`=? where `id`=?', [req.body.name,req.body.phone, req.body.email, req.body.password, req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
}

//delete user
exports.delete = (req, res)=>{
    con.query('DELETE FROM `users` WHERE `id`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
      });
}

