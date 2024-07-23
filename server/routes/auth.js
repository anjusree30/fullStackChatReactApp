


const express = require('express');
const { signup, login } = require('../controllers/auth.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.get('/anju', (req,res)=>{
//      res.send("Anju Sre");
// });
module.exports = router;
