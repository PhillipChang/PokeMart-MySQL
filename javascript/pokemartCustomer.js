var inquirer = require("inquirer");
var mysql = require("mysql");

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
    inquirer.prompt({
        type:"rawlist",
        name:"choice",
        message: "How may I help you?",
        choices:["View Inventory","Buy","Exit"]
    })
    .then(function(answer){
        switch(answer.choice){
            case 'View Inventory':
                viewInv();
                break;
            case 'Buy':
                buy();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}