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

  //const viewAllRoles = 
  //const viewAllEmployees =
  //const addDepartment =
  // const addRole =
  // const addEmployee =
  // const updateEmployeeRole = 