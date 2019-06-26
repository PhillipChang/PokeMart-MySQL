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

function viewInv(){
    var query = "SELECT * FROM products"
    connection.query(query,function(err,res){
        if (err) throw err;
        var table = new Table({
            head:["Item ID","Product Name", "Department Name", "Price", "Quantity"]
            // chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            //        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            //        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            //        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
          });
        for (i=0; i<res.length;i++){
            // console.log(res);
            table.push(
                [res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]
            );
        }
        console.log("\n",table.toString());
    });
    start();
}