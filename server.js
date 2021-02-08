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
        message: "what would you like to do",
        choices: ["View All Roles", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Delete Roll"]
    }).then(function(answer) {
        switch(answer.action) {
            case "View All Roles":
                viewAllRoles();
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
        }
    });
}

// inquirer flow --> 
// 1 what would you like to do?
    // 2 view all roles
function viewAllRoles() {
    connection.query("SELECT * FROM roles", function  (err, res) {
        if (err) throw err;
        // console.log(res[1]);
        const resArray = []
        for (let i = 0; i < res.length; i++) {
            resArray.push(res[i]);
            
            // console.table(res[i])
            // console.log(res[i].id, res[i].title, res[i].salary, res[i].department_id)
        }
        // console.log(resArray)
        console.table(resArray);
        // const exRole = res[1];
        // const exRole2 = res[2];
        // console.log(exRole.id, exRole.title, exRole.salary, exRole.department_id);
        // console.table([exRole, exRole2])
    })
};
    // 3 view all employees by dept
    // 4 vew all employees by manager   x
    // 5 add employee 
    // 6 remove employee                x
    // 7 update employee role
    // 8 update employee manager        x
    // 9 view all roles
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



//   function promptUser() {
//       console.log("connected !" )
//       inquirer
//       .prompt[({
//           name: "action",
//           type: "list",
//           message: "which query would you like to run?",
//           choices: ["FIND SONGS BY ARTIST", "FIND MULT-HIT ARTISTS", "FIND SPECIFIC SONG"]
//       },{

//       })]

      // artist name

      // more than once
      // specific song data
  
  
 
  


 // function which prompts the user for what action they should take
//   function start() {
//     inquirer
//       .prompt({
//         name: "postOrBid",
//         type: "list",
//         message: "Would you like to [POST] an auction or [BID] on an auction?",
//         choices: ["POST", "BID", "EXIT"]
//       })
//       .then(function(answer) {
//         // based on their answer, either call the bid or the post functions
//         if (answer.postOrBid === "POST") {
//           postAuction();
//         }
//         else if(answer.postOrBid === "BID") {
//           bidAuction();
//         } else{
//           connection.end();
//         }
//       });
//   }


// /Build a command-line application that at a minimum allows the user to:

// * Add departments, roles, employees

                                                    // addDepartment(), addRole(), addEmployee()

// * View departments, roles, employees

                                                    // viewDepartment(), viewRoles(), viewEmployees()

// * Update employee roles

                                                    // updateEmployees()

// Bonus points if you're able to:

// * Update employee managers

// * View employees by manager

// * Delete departments, roles, and employees   

                                                                //deleteDepartment(), deleteRole(), deleteEmployee()

// * View the total utilized budget of a department -- ie the combined salaries of all employees in that department