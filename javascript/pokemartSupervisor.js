var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"password",
    database:"pokemartDB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});


function start(){
    console.log(`     
     _   _   _   _   _   _   _   _
    / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\
   ( P | o | k | e | M | a | r | t )
    \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/`);
    inquirer.prompt({
        type:"rawlist",
        name:"choice",
        message: "How may I help you?",
        choices:["View Product Sales by Department","Create New Department","Exit"]
    })
    .then(function(answer){
        switch(answer.choice){
            case 'View Product Sales by Department':
                viewProdSales();
                break;
            case 'Create New Department':
                newDept();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}