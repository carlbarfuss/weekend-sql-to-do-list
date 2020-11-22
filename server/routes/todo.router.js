const express = require('express');
const toDoRouter = express.Router();
// DB CONNECTION
const pool = require('../modules/pool'); 

// GET
toDoRouter.get('/', (req, res) => {
    let sqlText = `SELECT * FROM todo ORDER BY completed;`;
    pool.query(sqlText)
        .then((result) => {
            //console.log('Got back', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error from db', error);
            res.sendStatus(500)});
});

// POST
toDoRouter.post('/', (req, res) => {
    let toDo = req.body
    let sqlText = `INSERT INTO todo ("task", "notes", "date_due", "completed") 
                   VALUES ($1, $2, $3, $4);`                 
    // $1 $2 $3 $4 are filled in by the array below the query  
    pool.query(sqlText, [toDo.task, toDo.notes, toDo.due_date, toDo.completed])
        .then( (response) => {
            res.sendStatus(201) // send OK status, insert complete
        }) 
        .catch((error)=>{
            console.log('error from db', error); 
            // res.sendStatus()
        })
});
// PUT
toDoRouter.put('/:toDoId', (req, res) => {
    let id = req.params.toDoId;
    console.log(`Updating task with id=${id}`);
    let sqlText = `UPDATE todo SET "completed"=TRUE where id=$1;`; 
    pool.query( sqlText, [id] )
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log('Error from db:', error);
            res.sendStatus(500);
        })
});

// DELETE -- STRETCH 
toDoRouter.delete('/:toDoId', (req, res) => { 
    let id = req.params.toDoId;
    let sqlText = `DELETE FROM todo WHERE id=$1;`; 
    pool.query(sqlText, [id])
    .then( (result) => {
        res.sendStatus(200)
    }) 
    .catch((error)=>{
        console.log('error from db', error); 
        res.sendStatus(500)
    })
})


module.exports = toDoRouter;  

