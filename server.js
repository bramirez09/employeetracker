const express = require('express');
const mysql = require('mysql2');
const app = express();
const inquirer = require('inquirer');
const { findSourceMap } = require('module');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'arianny09',
        database: 'cms_db'
    },
    console.log(`Connected to the cms_db database.`)
);

inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menuoptions',
            choices: ['View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add a Employee',
                'Update an Employee Role',
                "Exit",
            ],
        },
    ]).then((response) => {
        switch (response.menuoptions) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add a Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
        }
    });


const viewAllDepartments = () => {
    db.query('SELECT * from department', (err, response) => {
        if (err) {
            console.error(err)
        } else {
            console.table(response);
        }
    })
}

const viewAllRoles = () => {
    db.query('SELECT * from role', (err, response) => {
        if (err) {
            console.error(err)
        } else {
            console.table(response);
        }
    })
}

const viewAllEmployees = () => {
    db.query('SELECT * from employee', (err, response) => {
        if (err) {
            console.error(err)
        } else {
            console.table(response);
        }
    })
}

const addDepartment = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: "departmentname",
            message: "Enter new department name"

        }).then(res => {
            db.query('INSERT INTO department SET ?', {
                name: res.departmentname
            },
                (err, response) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log("Department successfully added!")
                    }
                })
        })

}

const addRole = () => {
    db.query('SELECT * from department', (err, response) => {
        const departmentChoices = []
        for (i = 0; i < response.length; i++) {
            departmentChoices.push({ name: response[i].name, value: response[i].id })
            // console.log({name:response[i].name, value: response[i].id});
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Enter Title'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter Salary amount'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Choose Department',
                choices: departmentChoices
            },
        ]).then(answer => {
            db.query('INSERT INTO role SET ?', {
                title: answer.role, salary: answer.salary, department_id: answer.department
            },
                (err, response) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log("Role successfully added!")
                    }
                })
        })
    })
}

const addEmployee = () => {
    db.query('SELECT * from role', (err, response) => {
        const roleChoices = []
        for (i = 0; i < response.length; i++) {
            roleChoices.push({ name: response[i].name, value: response[i].id })
        }
        db.query('SELECT * from employee', (err, response) => {
            const employeesChoices = []
            for (i = 0; i < response.length; i++) {
                employeesChoices.push({ name: response[i].name, value: response[i].id })
            }
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstname',
                    message: 'Enter employee first name'
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'Enter employee last name'
                },
                {
                    type: 'list',
                    name: 'roles',
                    message: 'Select employee title',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Select manager of employee',
                    choices: employeesChoices
                }
            ]).then(answer => {
                db.query('INSERT INTO employee SET ?', {
                    first_name: answer.firstname, last_name: answer.lastname, role_id: answer.roles, manager_id: answer.manager
                },
                    (err, response) => {
                        if (err) {
                            console.error(err)
                        } else {
                            console.log("Employee successfully added!")
                        }
                    })
            })
        })
    })
}

const updateEmployeeRole = () => {
    db.query('SELECT * from employee', (err, response) => {
        const employeeChoices = []
        for (i = 0; i < response.length; i++) {
            employeeChoices.push({ name: response[i].first_name, value: response[i].id })
        }
        db.query('SELECT * from role', (err, response) => {
            const roleChoice = []
            for (i = 0; i < response.length; i++) {
                roleChoice.push({ name: response[i].name, value: response[i].id })
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select employee to update',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    name: 'newrole',
                    message: 'What is the new role for the employee?',
                    choices: roleChoice
                }
            ]).then(answer => {
                let selectedEmployee = answer.employee;
                //console.log(answer.first_name, selectedEmployee);
                db.query('UPDATE employee SET ? WHERE `employee_id` = ?', [ 'employee_id', selectedEmployee], {
                    role_id: answer.newrole
                },
                    (err, response) => {
                        if (err) {
                            console.error(err)
                        } else {
                            console.log("Employee successfully updated!")
                        }
                    }
                )

            }
            )
        })
    })
}
