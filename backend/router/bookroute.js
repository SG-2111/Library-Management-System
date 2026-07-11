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


router.get('/api/books', authorizeRoles('Student','Librarian'),async(req,res) => {
    try{
        const result = await db.query('SELECT * from books');
        res.status(200).json(result.rows);
    }catch(err){
        console.error(err);
        res.status().json({error: 'Database error'});
    }
});


router.post('/api/books', authorizeRoles('Librarian'), async(req,res) => {
    const {title,author,genre,available_copies} = req.body;

    try{
        const text = 'INSERT INTO books(title,author,genre,available_copies) VALUES ($1, $2, $3, $4) RETURNING *;';
        const value = [title,author,genre,available_copies || 1];
        const result = await db.query(text, value);
        res.status(201).json((result.rows[0]));
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Database failure adding new book' });
    }
});

router.put('/api/books/:id', authorizeRoles('Librarian'), async(req,res) => {
    const {title,author,genre,available_copies} = req.body;

    try{
        const text = 'UPDATE books SET title = $1, author = $2, genre = $3, available_copies = $4 WHERE id = $5 RETURNING *;';
        const value = [title,author,genre,available_copies || 1];
        const result = await db.query(text,value);

        if (result.rows.length === 0){
            return res.status(404).json({error: 'Book is not found'});
        }
        res.status(200).json(result.rows[0]);

    }catch(err){
        console.error(err);
        res.status().json({error: 'Error in editing the book details'});
    }
})

router.delete('/api/books/:id', authorizeRoles('Librarian'), async(req,res) => {
    try{
        const text = 'DELETE FROM books WHERE id=$5 RETURNING *;';
        const result = await db.query(text,[req.params.id]);

        if (result.rows.length === 0){
            return res.status(404).json({error: 'Book not found'});
        }
        res.status(200).json({message: 'Book removed'})

    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Unable to remove book'});
    }
    
});

module.exports = router;


