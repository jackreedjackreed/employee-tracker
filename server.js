// require dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require('dotenv').config()
var pw = process.env.raisins
var cTable = require("console-table");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: pw,
    database: "megacorp_DB"
  });
  
// connect to the mysql server and sql database
connection.connect(function(err) {
if (err) throw err;
console.log("connected!")
promptUser()
// run the start function after the connection is made to prompt the user
// promptUser();
// searchArtist("Bing Crosby")
// searchTopArtists()
});

// * A query which returns all data for songs sung by a specific artist

function promptUser() {
    inquirer
    .prompt({
    // 1 what would you like to do?
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Delete Roll", "Finish"]
    }).then(function(answer) {
        switch(answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees by Department":
                viewAllEmployeesByDepartment();
                break;
            case "View All Employees by Manager":  // x
                viewAllEmployeesByManager();
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employe":  // x
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager": // x
                updateEmployeeManager();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Delete Role": // x
                deleteRole()
                break;
            case "Finish":
                connection.end()

        }
    });
}

// 1 view all employees
function viewAllEmployees() {
    var query = "SELECT employees.id as 'ID', employees.first_name as 'First Name', employees.last_name as 'Last Name', roles.title as 'Title', roles.salary as 'Salary', departments.name as 'Department', employees.manager_id as 'Manager ID' FROM employees ";
                                                                         // JOIN HELP HERE FROM: @NGDino
    query += "LEFT JOIN roles ON employees.role_id = roles.id ";        
    query += "LEFT JOIN departments ON roles.department_id = departments.id";

    // My Explanation

    // employees_table <-- JOIN the roles_table, with role_id FROM employees_table serving as the basis for the assortment of the join so we can then add Titles

    // role_id <-- roles.id <-- Title of roles.id: x

    // EXAMPLE --> employees table: "Philip", "Huang", role_id = "5", manager_id = "2"

    // in roles_table --> role_id: 5 === "Procurement Manger", which has salary of 150000 and department_id of 2
    
    // Procurement Manager pulls salary and department_id along with it

    // in departments_table --> department_id: 2 === "Procurement"

    // Finish with: ID, Philip, Huang, + role_id: 5 === "Procurement Manager", + Procurement Manager Salary, + department_id: 2 == "Procurement", manager_id: 

    connection.query(query, function  (err, res) { 
        if (err) throw err;  
        const resArray = []
        for (let i = 0; i < res.length; i++) {
            resArray.push(res[i]);
        }
        console.table(resArray);
        console.log("Action completed!");
        promptUser();
    });
};


    // 3 view all employees by dept
function viewAllEmployeesByDepartment() {
    var query = "SELECT employees.id as 'ID', employees.first_name as 'First Name', employees.last_name as 'Last Name', departments.name as 'Department', employees.manager_id as 'Manager ID' FROM employees ";

    query += "LEFT JOIN roles ON employees.role_id = roles.id ";              
    query += "LEFT JOIN departments ON roles.department_id = departments.id";

    connection.query(query, function  (err, res) { 
        if (err) throw err;  
        const resArray = []
        for (let i = 0; i < res.length; i++) {
            resArray.push(res[i]);
        }
        console.table(resArray);
        console.log("Action completed!");
        promptUser();
    });
}
    // 4 vew all employees by manager   x
    // 5 add employee 

    // INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Philip", "Huang", 5, 2),
function addEmployee() {
    inquirer
    .prompt([
        {
        name: "firstName",
        type: 'input',
        message: "What's the employee's first name?",
        }, {
        name: "lastName",
        type: 'input',
        message: "What's their last name?",
        }, {
        name: "role",
        type: "list",
        message: "What's their role?",
        choices: [
            {name: "IT Manager", value: "1"},
            {name: 'Tech Support', value: "2"},
            {name: 'Junior Developer', value: '3'},
            {name: 'Senior Developer', value: "4"},
            {name: 'Procurement Manager', value: '5'},
            {name: 'Junior Buyer', value: '6'},
            {name: 'Senior Buyer', value: '7'},
            {name: 'Sales Manager', value: '8'},
            {name: 'Sales Support', value: '9'},
            {name: 'Account Manager', value: '10'},
            {name: 'Sales Executive', value: '11'}]
        },
        {
            name: "managerID",
            type: "input",
            message: "What's the number of their manager's ID?",
        }
    ]).then((res) => {
        // INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Philip", "Huang", 5, 2),
        connection.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", ${res.role}, ${res.managerID})`
        );
    console.log("Role added!")
    viewAllEmployees();
    });
}

    // 6 remove employee                x
    // 7 update employee role
    // 8 update employee manager        x


    // 9 view all roles
function viewAllRoles() {
    var query = "SELECT roles.title as 'Title', roles.salary as 'Salary', departments.name as 'Department' FROM roles ";

    // query += "LEFT JOIN roles ON employees.role_id = roles.id ";                
    query += "LEFT JOIN departments ON roles.department_id = departments.id ";
    query += "ORDER BY departments.id";
    connection.query(query, function  (err, res) {
        if (err) throw err;
        const resArray = []
        for (let i = 0; i < res.length; i++) {
            resArray.push(res[i]);
        }
        console.table(resArray);
        console.log("Action completed!")
        promptUser();
    });
};
    // 10 add role
function addRole() {
    inquirer
    .prompt([
        {
        name: "title",
        type: 'input',
        message: "What's the title of this new role?",
        }, {
        name: "salary",
        type: 'input',
        message: "What's the salary?",
        }, {
        name: "department",
        type: "list",
        message: "Which department?",
        choices: [{name: "IT", value: "1"}, {name: 'Procurement', value: "2"}, {name: 'Sales', value: '3'}, {name: 'Accounting', value: "4"}]
        }
    ]).then((res) => {
        // INSERT INTO roles (title, salary, department_id) VALUES ("IT Manager", 165000, 1)
        // console.log(`INSERT INTO roles (${res.title}, ${res.salary}, ${res.department})`);
        connection.query(
            `INSERT INTO roles (title, salary, department_id) VALUES ("${res.title}", ${res.salary}, ${res.department})`
        );
    console.log("Role added!")
    viewAllRoles();
    })
}
    // 11 delete role                   x











// function searchArtist(artistName) {
//     // build query
//     var query = "SELECT artistName, position, songTitle, releaseYear FROM top5000 WHERE ?";

//     connection.query(query, [{ artistName: artistName }], function(err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     })
// }

// // * A query which returns all artists who appear within the top 5000 more than once
// function searchTopArtists() {
//     var query = "SELECT artistName FROM top5000 WHERE "

//     connection.query(query, function(err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     })
// }
// GROUP BY raw_total ORDER BY COUNT(artistName) DESC
// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT name, address FROM customers", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
// }

// SELECT COUNT(CustomerID), Country
// FROM Customers
// GROUP BY Country
// ORDER BY COUNT(CustomerID) DESC;

// * A query which returns all data contained within a specific range
// * A query which searches for a specific song in the top 5000 and returns the data for it


