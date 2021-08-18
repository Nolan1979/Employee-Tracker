const { prompt } = require('inquirer');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
})

runIt = () => {
    inquirer.prompt(

        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: [
                { name: ' View All Employees', value: 'VIEW_EMPLOYEES' },
                { name: 'View All Departments', value: 'VIEW_EMPLOYEES_BY_DEPT' },
                { name: 'View All Roles', value: 'VIEW_EMPLOYEES_BY_ROLE' },
                { name: 'Add Employee', value: 'ADD_NEW_EMPLOYEE' },
                { name: 'Add Role', value: 'ADD_NEW_ROLE' },

                // 'Update Employee Role',
                
                // 'Add Department'
            ]
        })
        .then(res => {
            let choice = res.options;

            switch (choice) {
                case 'VIEW_EMPLOYEES':
                    viewEmployees();
                    break;
                case 'VIEW_EMPLOYEES_BY_DEPT':
                    viewEmployeesByDept();
                    break;
                case 'VIEW_EMPLOYEES_BY_ROLE':
                    viewEmployeesByRole();
                    break;
                case 'ADD_NEW_EMPLOYEE':
                    addEmployee();
                    break;
                case 'ADD_NEW_ROLE':
                    addRole();
                    break;
            }

        })
};


function viewEmployees() {

    connection.query('SELECT * FROM employee', function (err, res) {
        console.table(res)
    })
};

function viewEmployeesByDept() {
    connection.query('SELECT * FROM department', function (err, res) {
        console.table(res)
    })

};

function viewEmployeesByRole() {
    connection.query('SELECT * FROM role', function (err, res) {
        console.table(res)
    })
};

function addEmployee() {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is new employee first's name?",
            name: 'firstName',
        },
        {
            type: 'input',
            message: "What is new employee's last name?",
            name: 'lastName',
        },
        {
            type: 'input',
            message: "What is new employee's role?",
            name: 'roleName',
        },
        {
            type: 'input',
            message: "What is new employee manager's name?",
            name: 'managerName',
        }])
        .then(function (a) {
            const query = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)'
            connection.query(query, [a.firstName, a.lastName, 1,1], function (err, results) {
                console.log(results); // results contains rows returned by server
            });
        });
};


function addRole() {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is new role name?",
            name: 'roleName',
        },
        {
            type: 'input',
            message: "What is new role salary?",
            name: 'roleSalary',
        },
        {
            type: 'input',
            message: "What is new role department?",
            name: 'departmentId',
        }])
        .then(function (b) {
            const query = 'INSERT INTO role(title, salary, department_id) VALUES (?,?,?)'
            connection.query(query, [b.roleName, b.roleSalary, b.departmentId], function (err, results) {
                console.log(results); // results contains rows returned by server
            });
        });
};












runIt();

        // .then((data) => {







        // });

