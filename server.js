const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
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
    db.query('SELECT * department', (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    })
}

  //const viewAllRoles = 
  //const viewAllEmployees =
  //const addDepartment =
  // const addRole =
  // const addEmployee =
  // const updateEmployeeRole = 