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
                { name: 'View All Employees', value: 'VIEW_EMPLOYEES' },
                { name: 'View All Departments', value: 'VIEW_EMPLOYEES_BY_DEPT' },
                { name: 'View All Roles', value: 'VIEW_EMPLOYEES_BY_ROLE' },
                { name: 'Add Employee', value: 'ADD_NEW_EMPLOYEE' },
                { name: 'Add Role', value: 'ADD_NEW_ROLE' },
                { name: 'Add Department', value: 'ADD_NEW_DEPARTMENT' },
                { name: 'Update Employee Role', value: 'UPDATE_EMPLOYEE_ROLE' },
                { name: 'Exit', value: 'EXIT' }
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
                case 'ADD_NEW_DEPARTMENT':
                    addDepartment();
                    break;
                case 'UPDATE_EMPLOYEE_ROLE':
                    updateEmployeeRole();
                    break;
                case 'EXIT':
                    connection.end();
                    console.log('Enter "node server" to restart')
            };
        })
};


function viewEmployees() {

    connection.query(`SELECT employee.id AS employee_id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name, 
    role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON department.id = role.department_id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`, function (err, res) {
        console.log('=======================')
        console.table(res)
    })
    console.log('=======================')
    runIt();
};

function viewEmployeesByDept() {
    connection.query('SELECT * FROM department', function (err, res) {
        console.log('=======================')
        console.table(res)
    })
    console.log('=======================')
    runIt();
};

function viewEmployeesByRole() {
    connection.query('SELECT * FROM role', function (err, res) {
        console.log('=======================')
        console.table(res)
    })
    console.log('=======================')
    runIt();
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
            connection.query(query, [a.firstName, a.lastName, 1, 1], function (err, results) {
                console.log('================')
            });
            runIt();
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
                console.log('================')
                console.log(results);
            });
            console.log('=======================')
            runIt();
        });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is new department name?",
            name: 'departmentName',
        }])
        .then(function (c) {
            const query = 'INSERT INTO department(name) VALUES (?)'
            connection.query(query, [c.departmentName], function (err, results) {
                console.log('================')
                console.log('Added New Department');
                console.log(results);
            });
            console.log('=======================')
            runIt();
        });
};

function updateEmployeeRole() {
    inquirer.prompt([

        {
            type: 'list',
            message: "Select employee",
            name: 'employeeList',
            choices: [
                "Bob Uecker",
                "Lynn Belvedere",
                "Terry Jones",
                "Terry Gilliam",
                "Julius Erving",
                "Pete Maravich",
            ]
        },
        {
            type: 'list',
            message: "Select new role",
            name: 'roleList',
            choices: [
                "Senior Accountant",
                "Accountant",
                "Senior Market Research Manager",
                "Data Analyst",
                "Sales Rep",
                "Cashier",
            ]
        }])
        .then(function (u) {
            const query = 'UPDATE employee SET role_id AS role.title = roleList WHERE id = employeeList`'
            connection.query(query, [u.empList, u.roleList], function (err, results) {
                console.log('================')
                console.log(results);
            });
            runIt();
        });
};

runIt();
