const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const newData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');


//Routes
//GET
router.get('/api/notes', (_req, res) => {
    console.log('working on it');
    fs.readFile(path.join(__dirname, '/../db/db.json'), 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        }
        res.json(JSON.parse(data));
    });
    console.log('reading ....')
});
//POST 
router.post('/api/notes', (_req, res) => {
    _req.body.id = uuidv4();
    fs.readFile(path.join(__dirname, '/../db/db.json'), 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        };
        const notes = JSON.parse(data);
        console.log('Reading ....');
        notes.push(_req.body);
        fs.writeFile(path.join(__dirname, '/../db/db.json'), JSON.stringify(notes), (err) => {
            if (err)
                console.log(error);
            else {
                console.log('Adding ....');
                res.json(true);
            };
        });
    });
});
//DELETE 
router.delete('/api/notes/:id', (_req, res) => {
    const deleteID = _req.params.id;
    console.log(deleteID);
    for (i = 0; i < newData.length; i++) {
        if (newData[i].id === deleteID) {
            newData.splice(i, 1);
        };
    };

    fs.writeFile(path.join(__dirname, '/../db/db.json'), JSON.stringify(newData), (err) => {
        if (err)
            console.log(error);
        else {
            console.log('Deleting ....');
            res.json(true);
        };
    });
});

module.exports = router;