'use strict';
//const mysql = require('mysql');
const mysql2 = require('mysql2');
const db = require('../db').con;

function create(req,res){
    const name = req.body.name;
    const description = req.body.description;

    db.getConnection(async(err, connection) => {
        if(err) throw(err);

    const sqlSearch = 'SELECT * FROM Client Where Name = ?';
    const search_query = mysql2.format(sqlSearch,[name]);

    const sqlInsert = 'INSERT INTO Client(Name,Description) VALUES(?,?)';
    const insert_query = mysql2.format(sqlInsert,[name, description]);

    await connection.query( search_query, async(err, result) => {
        if(err) throw(err);
        
        if(result.length !== 0){
            connection.release();
            console.log('Client already exists');
            res.sendStatus(409);
        }
        else {
            await connection.query(insert_query, async(err, result) => {

                connection.release();

                if(err) throw(err);
                console.log('Client createad', result.insertId);
                res.sendStatus(201);
            })
        }
    })
    })
}

function clients(req,res){
    db.getConnection( async(err, connection) => {
        if(err) throw(err);

        const sqlSearch = 'SELECT * FROM Client'
        const search_query = mysql2.format(sqlSearch)

        await connection.query(search_query, (err, result) => {
            if(result.length !== 0){
                connection.release();
                res.status(200).json({result});
            }
            else {Grady
                res.status(404);
            }
        })
    })
}

function update(req,res) {
    const name = req.body.name;
    const newName = req.body.newName;
    const description = req.body.description;

    db.getConnection( async(err, connection) => {
        const sqlSearch = 'SELECT * FROM Client WHERE Name = ?';
        const search_query = mysql2.format(sqlSearch,[name]);
        const sqlUpdate = 'UPDATE Client SET Name = ? , Description = ? WHERE Name = ?';
        const update_query = mysql2.format(sqlUpdate,[newName,description,name]);

        await connection.query(update_query, (err, result) => {
            if(result.length !== 0){
                connection.release();
                res.status(200).send('Client modified')
            }
            else {
                res.status(404);
            }
        })
    })
}

function deleteClient(req, res) {
    const name = req.body.name;
    const sqlDelete = 'DELETE FROM Client WHERE Name= ?'
    const delete_query = mysql2.format(sqlDelete,[name]);

    db.getConnection( async(err,connection) => {
        await connection.query(delete_query, (err, result) => {
            if(result !== 0){
                connection.release();
                res.status(200).send('Client deleted');
            }
            else {
                res.status(404);
            }
        })
    })
}

module.exports = {
    clients,
    create,
    update,
    deleteClient
}