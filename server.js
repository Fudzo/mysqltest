const express = require('express');
const port = 3000;
const app = express();
const mysql = require('mysql2/promise');

connectionString = { host:'localhost', user: 'root', database: 'pekom', password: 'thefuki88' };

const fetchKorisnike = async (sqlString) => {  
    const connection = await mysql.createConnection(connectionString);
    const [rows, fields] = await connection.execute(sqlString);
    return rows;
}

const izbrisiUsera = async (table, id) => {
    const connection = await mysql.createConnection(connectionString);
    const [rows, fields] = await connection.execute(`DELETE FROM ${table} where id = ${id}`);
    console.log(rows);
};

const nekaFunkcija = async () => {
    const imena = await fetchKorisnike('SELECT * FROM users');
    console.log(imena);
};

// izbrisiUsera('users', 7);
// nekaFunkcija();

app.get('/', async (req, res)  => {
    res.json(await fetchKorisnike('Select * from users'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});