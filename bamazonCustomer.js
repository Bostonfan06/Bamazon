var mysql = require('mysql')
var inquirer = require('inquirer')

/*Connection to SQL Database*/
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function(err){
    if(err) throw err;
    displayProducts();
})

/*Displays All Products in Database*/
var displayProducts = function(){
    var query = 'SELECT * FROM Products'
    connection.query(query, function(err, res){
        for (var i = 0; i < res.length; i++){
            console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name +
        " || Department: " + res[i].department_name + " || Price: " + res[i].price + 
    " || Stock: " + res[i].stock_quantity);
        }
        shoppingCart();
    })
}

var shoppingCart = function(){
    inquirer.prompt([{
        name: "ProductID",
        type: "input",
        message: "Which product would you like to buy?",

        validate: function(value){
            if(isNaN(value) == false){
                return true;
            } else {
                return false;
            }
        }
    },{
        name: "Quantity",
        type: "input",
        message: "How many would you like to buy?",

        validate: function(value) {
            if (isNaN(value) == false){
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer){

        var query = 'SELECT * FROM Products WHERE item_id=' + answer.Quantity;
        connection.query(query, function(err, res){
            if (answer.Quantity <= res){
                for(var i = 0; i < res.length; i++){
                    console.log("We currently have " +res[i].stock_quantity + " " + res[i].product_name + " .");
                    console.log("Thank you for your purchase! " + " You ordered: " + res[i].stock_quantity + " of " + res[i].product_name 
                + " and it is currently being processed!")
                }
            } else {
                console.log("InSufficient Quantity! Check our Inventory!");
            }
            displayProducts()
        })
    })
}