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
    setTimeout(function(){
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
},100) 
}


function viewInv(){
    var query = "SELECT * FROM products"
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

function addInv(){
    inquirer.prompt([
        {
        name:"choice",
        type:"input",
        message:"What item would you like to replenish? (Enter Item ID)",
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
        message:"How many would you like to replenish?",
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
    connection.query(quantityQuery,[answer.choice],function(error,res){
        if (error) throw error;
        var qty = res[0].stock_quantity;
        var price = res[0].price;
        var prod = res[0].product_name;

    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
    qty += parseInt(answer.quantity);
    connection.query(query,[qty,answer.choice],function(err){
        if (err) throw err;
        var total = price * answer.quantity;
        console.log("You have successfully replenished",answer.quantity,prod,"totaling","$"+total.toFixed(2));
        });
    });
    start();
});
}

function addNewProd(){
    var query = "SELECT * FROM departments"
    connection.query(query,function(err,res){
        if (err) throw err;

    inquirer.prompt([
        {
        name:"name",
        type:"input",
        message:"What is the name of the product you would like to add?"
    },
    {
        name:"dept",
        type:"list",
        message:"What department does this fall under?",
        choices:function(){
            var depts = [];
                for (i=0 ; i<res.length ; i++){
                    depts.push(res[i].department_name);
                }
            return depts;
        }
    },
    {
        name:"price",
        type:"input",
        message:"What is the price per unit?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    },
    {
        name:"qty",
        type:"input",
        message:"How many units are there?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    },
])
.then(function(answer){
    var query = "INSERT INTO products SET ?"
    var mgrPrice = parseInt(answer.price).toFixed(2);
    connection.query(query,{product_name:answer.name,department_name:answer.dept,price:mgrPrice,stock_quantity:answer.qty},function(err,res){
        if (err) throw err;
        console.log("You have successfully added",answer.qty,answer.name);
        start();
    });
});
});
}

