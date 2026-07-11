const express = require('express');
const router = express.Router();
const db = require('../configure/db');

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


router.post('/api/auth/register', async(req,res) =>{
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try{
        const text = 'INSERT INTO users(name,email,password,role) VALUES ($1, $2, $3, $4) RETURNING id, name, role';
        const values = [name,email,password,role];
        const result = await db.query(text,values);
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Unable to register data'});
    }
});

router.post('/api/auth/login', async(req,res) => {
    const { name, password } = req.body;
    try {
        const text = 'SELECT id, name, role FROM users WHERE name = $1 AND password = $2;';
        const result = await db.query(text, [name, password]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({message:'Logged in!'});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Database authentication failed' });
    }
});

module.exports = router;