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


router.post('/api/borrow_records/:bookId', authorizeRoles('Student'), async (req, res) => {
    try {
        const text = `INSERT INTO borrow_records(student_id, book_id, borrow_date, due_date, status) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
        const values = [req.user.id, req.params.bookId, borrowDate, dueDate, 'borrowed'];
        const result = await db.query(text, values);
        res.status(201).json(result.rows);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to execute' });
    }
});

router.put('/api/borrow_records/:id/return', authorizeRoles('Student'), async (req, res) => {
    try{
        const text = 'UPDATE borrow_records SET status = $1, return_date = NOW() WHERE id = $2 AND student_id = $3 RETURNING *;';
        const result = await db.query(text,['returned',req.params.id, req.user.id]);
        if (result.rows.length === 0){
            return res.status(404).json({error: 'Active records nor found'});            
        }
        res.status(200).json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to process records' });
    }
});

router.get('/api/borrow_records/all', authorizeRoles('Librarian'), async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM borrow_records;');
        res.status(200).json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to get all the borrow_records' });
    }
});

module.exports = router;
