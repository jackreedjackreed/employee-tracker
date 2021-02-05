var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require('dotenv').config()
var pw = process.env.raisins

console.log("hey")
console.log(pw)
console.log("bye")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "pw",
    database: "top_songsDB"
  });
  
// connect to the mysql server and sql database
connection.connect(function(err) {
if (err) throw err;
// run the start function after the connection is made to prompt the user
// promptUser();
// searchArtist("Bing Crosby")
searchTopArtists()
});

// * A query which returns all data for songs sung by a specific artist


// inquirer flow --> 
// what would you like to do?
    // view all roles
    // view all employees by dept
    // vew all employees by manager
    // add employee
    // remove employee
    // update employee role
    // update employee manager
    // view all roles
    // add role
    // delete role






























function searchArtist(artistName) {
    // build query
    var query = "SELECT artistName, position, songTitle, releaseYear FROM top5000 WHERE ?";

    connection.query(query, [{ artistName: artistName }], function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}

// * A query which returns all artists who appear within the top 5000 more than once
function searchTopArtists() {
    var query = "SELECT artistName FROM top5000 WHERE "

    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}
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



  function promptUser() {
      console.log("connected !" )
      inquirer
      .prompt[({
          name: "action",
          type: "list",
          message: "which query would you like to run?",
          choices: ["FIND SONGS BY ARTIST", "FIND MULT-HIT ARTISTS", "FIND SPECIFIC SONG"]
      },{

      })]

      // artist name

      // more than once
      // specific song data
  }
  
 
  


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