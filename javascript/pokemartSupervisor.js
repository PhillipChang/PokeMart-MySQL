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
                console.log("GoodBye Have a Nice Day! (☞ﾟヮﾟ)☞");
                connection.end();
                break;
        }
    });
},100)
}

function viewProdSales(){
        var query = "SELECT department_id,departments.department_name,product_sales,over_head_costs,(product_sales - over_head_costs) AS total FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY department_name";
        connection.query(query,function(err,response){
            if (err) throw err;        
            var table = new Table({head:["Dept ID","Dept Name", "Overhead Cost", "Product Sales","Total Profit/Loss"]
                ,colWidths:[10,20,15,15,20]
            });
            for (i=0; i<response.length;i++){
                // console.log(res);
                var total = parseInt(response[i].total).toFixed(2);
                if (isNaN(total)){
                    total = 0;
                }
                table.push(
                    [response[i].department_id,response[i].department_name,response[i].over_head_costs,response[i].product_sales,total]
                );
            }
            console.log("\n"+table.toString());
            start();
        });           
}

function newDept(){
    inquirer.prompt([
        {
        name:"newDept",
        type:"input",
        message:"What is the name of the department?",
    },
    {
        name:"cost",
        type:"input",
        message:"What is the overhead cost of the department?",
    }
])
.then(function(answer){
    var query = "INSERT INTO departments SET ?"
    connection.query(query,{department_name:answer.newDept,over_head_costs:answer.cost},function(error,res){
        if (error) throw error;
        console.log(res.affectedRows + " department inserted!\n");
        console.log("ADDED Department",answer.newDept,"!!!");
    });
    start();
});
}