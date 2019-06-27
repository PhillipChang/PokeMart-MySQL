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
//     console.log(`     
//      _   _   _   _   _   _   _   _
//     / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\
//    ( P | o | k | e | M | a | r | t )
//     \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/`);
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

function buy(){
    inquirer.prompt([
        {
        name:"buyerChoice",
        type:"input",
        message:"What item would you like to purchase? (Enter Item ID)",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    },
    {
        name:"quantity",
        type:"input",
        message:"How many would you like to purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }
])
.then(function(answer){
    var quantityQuery = "SELECT stock_quantity,item_id,price,product_name FROM products WHERE item_id = ?"
    connection.query(quantityQuery,[answer.buyerChoice],function(error,res){
        if (error) throw error;
        var qty = res[0].stock_quantity;
        var price = res[0].price;
        var prod = res[0].product_name;
        if (answer.quantity >= qty){
            console.log("There is not sufficient inventory to meet your needs.");
            }
        else{
    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
    qty -= answer.quantity;
    connection.query(query,[qty,answer.buyerChoice],function(err){
        if (err) throw err;
        var total = price * answer.quantity;
        console.log("You have successfully bought",answer.quantity,prod,"for","$"+total.toFixed(2));
        });
        };
        start();
    });
});
}