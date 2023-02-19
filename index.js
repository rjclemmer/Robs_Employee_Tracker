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

// Main Menu Questions
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

// function that adds a department
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
}

// function that can add an employee .... kind of
async function addEmployee() {
  const employeeInfo = await inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleId",
        type: "number",
        message: "What is the employee's role?",
      },
      {
        name: "managerId",
        type: "confirm",
        message: "Is the employee a manager?",
      },
    ])
    .then((data) => {
      // if managerid is true, sets manager to null, else not a manager, managerid is set to 1
      let isManager;
      if(data.managerId === true) {
        isManager = null;
      } else {
        isManager = 1
      }
      console.log(data);
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: data.roleId,
          manager_id: isManager,
        },

        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " Employee Added\n");
          mainMenu();
        }
      );
    });
}

// function that will add Role
async function addRole() {
  // first gets info from department table and then renders them as options in prompt
  db.query("SELECT * FROM department;", async (err, departments) => {
    if (err) {
      console.log("\n I'm sorry Dave. I'm afraid I can't do that.");
      return mainMenu();
    }
    console.log(departments);

    const roleInfo = await inquirer
      .prompt([
        {
          name: "dept",
          type: "list",
          message: "Which departments will this role be associated with?",
          choices: departments.map((row) => {
            return { name: row.name, value: row.id };
          }),
        },
        {
          name: "title",
          type: "input",
          message: "What role are you creating?",
        },
        {
          name: "salary",
          type: "number",
          message: "What is the salary for this role?",
        },
      ])
      .then((data) => {
        console.log(data);

        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', ${data.salary}, ${data.dept})`,
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Role Added\n");
            mainMenu();
          }
        );
      });
  });
}


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
      let sqlQuery = 
      // `Select * from employee;`;

      `SELECT employee.id AS ID, CONCAT(employee.first_name, ' ', employee.last_name) AS Name, role.title AS Role, role.salary AS Salary, department.name AS Department, IF(employee.manager_id IS NULL, 'Manager', CONCAT(employee2.first_name,' ', employee2.last_name)) AS Manager
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
    }

    // Add Employee
    if (choice.userChoice === "Add employee") {
      console.log("Adding employee:");
      addEmployee();
    }

    // Add Role
    if (choice.userChoice === "Add role") {
      console.log("Adding role:");
      addRole();
    }
  });
}
mainMenu();
