// imports
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const connection = require("./config/connections");
require("dotenv").config();

// Connects to database
const db = mysql.createConnection(
  {
    host: connection.db_host,
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "jphunc",
    database: "employee_db",
  },
  console.log(`Connected to the database.`)
);

// Main Meue Questions
const primaryQuestions = [
  {
    type: "list",
    message: "Choose an option.",
    name: "userChoice",
    choices: [
      "View all employees",
      "Add employee",
      "Update employee role",
      "View all roles",
      "Add role",
      "View all departments",
      "Add department",
      "Quit",
    ],
    default: [0],
    suffix: " Use arrow keys to select your choice.",
  },
];

// Main Menu Function
function mainMenu() {
  inquirer.prompt(primaryQuestions).then((choice) => {
    console.log(choice);

    // exit out of program
    if (choice.userChoice === "Quit") {
      console.log("Bye Felicia!");
      process.exit();
    }

    // View All departments
    if (choice.userChoice === "View all departments") {
      console.log("Viewing all Departments:");
      let sqlQuery = `SELECT name FROM department;`;

      db.query(sqlQuery, (err, res) => {
        if (err) {
          console.log("\n I'm sorry Dave. I'm afraid I can't do that.");
          return mainMenu();
        }
        console.log("DEPARTMENTS!");
        console.table(res);
        mainMenu();
      });
    };

    // View All roles
    if (choice.userChoice === "View all roles") {
      console.log("Viewing all Roles:");
      let sqlQuery = `SELECT role.id AS Id, role.title AS Role, role.salary AS Salary, department.name AS department
      From Role
      JOIN department ON role.department_id = department.id`;

      db.query(sqlQuery, (err, res) => {
        if (err) {
          console.log("\n I'm sorry Dave. I'm afraid I can't do that.");
          return mainMenu();
        }
        console.log("ROLES!");
        console.table(res);
        mainMenu();
      });
    };

    // View All employees
    if (choice.userChoice === "View all roles") {
        console.log("Viewing all Roles:");
        let sqlQuery = `SELECT role.id AS Id, role.title AS Role, role.salary AS Salary, department.name AS department
        From Role
        JOIN department ON role.department_id = department.id`;
  
        db.query(sqlQuery, (err, res) => {
          if (err) {
            console.log("\n I'm sorry Dave. I'm afraid I can't do that.");
            return mainMenu();
          }
          console.log("ROLES!");
          console.table(res);
          mainMenu();
        });
      };
  });
}
mainMenu();
