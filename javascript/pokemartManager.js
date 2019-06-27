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
        message: "What would you like to do?",
        choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add new Product","Exit"]
    })
    .then(function(answer){
        switch(answer.choice){
            case 'View Products for Sale':
                viewInv();
                break;
            case 'View Low Inventory':
                viewLowInv();
                break;
            case 'Add to Inventory':
                addInv();
                break;
            case 'Add new Product':
                addNewProd();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}