// imports 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const connection = require('./config/connections');
require('dotenv').config()


// Connects to database
const db = mysql.createConnection(
    {
      host: connection.db_host,
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'jphunc',
      database: "employee_db",
    },
    console.log(`Connected to the database.`)
  );