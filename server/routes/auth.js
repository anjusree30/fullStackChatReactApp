const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    // Your signup logic here
    res.send('Signup route working');
});

router.post('/login', (req, res) => {
    // Your login logic here
    res.send('Login route working');
});

module.exports = router;
