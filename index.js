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

async function addDepartment() {
  const departmentName = await inquirer.prompt({
    name: "department",
    type: "input",
    message: "What department are you adding",
  });

  const data = departmentName.department;
  console.log(data);
  db.query(
    "INSERT INTO department SET ?",
    {
      name: data,
    },

    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Department Added\n");
      mainMenu();
    }
  );
};

async function addRole() {
  const departmentName = await inquirer.prompt({
    name: "department",
    type: "input",
    message: "What department are you adding",
  });

  const data = departmentName.department;
  console.log(data);
  db.query(
    "INSERT INTO department SET ?",
    {
      name: data,
    },

    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Department Added\n");
      mainMenu();
    }
  );
};

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
      let sqlQuery = `SELECT department.name as Name, department.id as ID FROM department;`;

      db.query(sqlQuery, (err, res) => {
        if (err) {
          console.log("\n I'm sorry Dave. I'm afraid I can't do that.");
          return mainMenu();
        }
        console.log("DEPARTMENTS!");
        console.table(res);
        mainMenu();
      });
    }

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
    }

    // View All employees
    if (choice.userChoice === "View all employees") {
      console.log("Viewing all Employees:");
      let sqlQuery = `SELECT employee.id AS ID, CONCAT(employee.first_name, ' ', employee.last_name) AS Name, role.title AS Role, role.salary AS Salary, department.name AS Department, IF(employee.manager_id IS NULL, 'Manager', CONCAT(employee2.first_name,' ', employee2.last_name)) AS Manager
        From employee
        JOIN role ON employee.role_id = role.id
        JOIN department on role.department_id = department.id
        LEFT JOIN employee employee2 ON employee.manager_id = employee2.id
        `;

      db.query(sqlQuery, (err, res) => {
        if (err) {
          console.log("\n I'm sorry Dave. I'm afraid I can't do that.");
          return mainMenu();
        }
        console.log("EMPLOYEES!");
        console.table(res);
        mainMenu();
      });
    }

    // Add Department
    if (choice.userChoice === "Add department") {
      console.log("Adding department:");
      addDepartment();

      // function addDepartment() {
      //   inquirer.prompt({type: 'input', name: 'name', message: 'What\'s the name of the new department? ', validate: name => {return (!name ? 'Write the title for the NEW role' : true);}})
      //   .then((data) => {
      //       db.add('department', 'name', `'${data.name}'`);
      //   });

      // const add = (table, columns, data) => {
      //   let queryReq = `INSERT INTO ${table} (${columns}) VALUES (${data});`;
      //   db.query(queryReq, (err, res) => {
      //       if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
      //       console.log(`\nNew ${table} was successfully created\n`);
      //       app.showMenu();
      //   });
    }

    // let queryReq =
  });
}
mainMenu();
