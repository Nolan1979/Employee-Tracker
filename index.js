require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || 'password',
    database: process.env.DATABASE || 'employee_db'
}, console.log(`Connected to the database ${process.env.DATABSE}`));

