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


function viewInv(){
    var query = "SELECT * FROM products"
    connection.query(query,function(err,res){
        if (err) throw err;
        // console.log(res);
        var table = new Table({head:["Item ID","Product Name", "Dept Name", "Price", "Quantity"]
            ,colWidths:[10,20,15,15,10]
        });
        for (i=0; i<res.length;i++){
            // console.log(res);
            table.push(
                [res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]
            );
        }
        console.log("\n"+table.toString());
        start();
    });
}

function viewLowInv(){
    var query = "SELECT * FROM products WHERE stock_quantity <= 5"
    connection.query(query,function(err,res){
        if (err) throw err;
        var table = new Table({head:["Item ID","Product Name", "Dept Name", "Price", "Quantity"]
            ,colWidths:[10,20,15,15,10]
        });
        for (i=0; i<res.length;i++){
            table.push(
                [res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]
            );
        }
        console.log("\n"+table.toString());
        start();
    });
}