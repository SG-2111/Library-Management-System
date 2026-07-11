require("dotenv").config();
const express = require('express');
const db = require("./configure/db");

const authorizeRoles = (allowedRole) =>(req,res,next) =>{
    const header = req.headers['authorization'];
    if (!header){
        return res.status(401).json({error:'Access missing'});
    }
    const userRole = req.headers['user-role'];

    if (userRole!==allowedRole && userRole !== 'Librarian'){
        return res.status(403).json({ error: 'Access denied'});
    }
    req.user = { id: 1, role: userRole };
    next();
};

const auth = require('./router/auth');
const bookroute = require('./router/bookroute');
const borrowrecords = require('./router/borrowrecords');

const app = express();
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/books', bookroute);
app.use('/api/borrow_records', borrowrecords);

app.listen(5000,() => {
    console.log("Running on port 5000 successfully")
});

module.exports = {authorizeRoles};