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


// var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
// query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
// query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";


// inquirer flow --> 
// 1 what would you like to do?
    // 2 view all employees
// function viewAllEmployees() {
//     connection.query("SELECT * FROM employees LEFT JOIN roles", function  (err, res) {
//         if (err) throw err;
//         // console.log(res[1]);
//         console.log(res);
//         const resArray = []
//         for (let i = 0; i < res.length; i++) {
//             resArray.push(res[i]);
//         }
//         console.table(resArray);
//         console.log("Action completed!");
//         promptUser();
//     });
// };

function viewAllEmployees() {
    connection.query("SELECT employees.id as 'ID', employees.first_name as 'First Name', employees.last_name as 'Last Name', roles.title as 'Title', roles.salary as 'Salary', departments.name as 'Department', employees.manager_id as 'Manager ID' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id", function  (err, res) { // query help here from @NGDino
        if (err) throw err;  
        // console.log(res[1]);
        console.log(res);
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
    console.log("hi")
}
    // 4 vew all employees by manager   x
    // 5 add employee 
    // 6 remove employee                x
    // 7 update employee role
    // 8 update employee manager        x
    // 9 view all roles

function viewAllRoles() {
    connection.query("SELECT * FROM roles", function  (err, res) {
        if (err) throw err;
        // console.log(res[1]);
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


