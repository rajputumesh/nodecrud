const { check } = require('express-validator');
exports.stote = [
    check('name','Name is Requried').notEmpty(),
    check('phone','Phone is Requried').notEmpty(),
    check('email','Phone is Requried').notEmpty(),
    check('password','Password must be in 6 charactors').isLength({min:6}),
    check('created_at','Created At is Requried').notEmpty()
]

exports.update = [
    check('name','Name is Requried').notEmpty(),
    check('phone','Phone is Requried').notEmpty(),
    check('email','Phone is Requried').notEmpty(),
    check('password','Password must be in 6 charactors').isLength({min:6})
]