# PokeMart-MySQL

### PokeMart Customer View
![Screenshot](images/customer.gif)

### PokeMart Manager View
![Screenshot](images/manager.gif)

### PokeMart Supervisor View
![Screenshot](images/supervisor.gif)

## Description

PokeMart MySQL is a database built using MySQL. This database tracks the inventory of the PokeMart store. Whether you are the pokemon traveller,manager or supervisor there is a functionality that suits you.

## How to use PokeMart MySQL

1) Open either gitbash or terminal and enter one of the following starting commands:

    a) If you are a Pokemon Traveller buying:
    >node pokemartCustomer.js

    b) If you are the PokeMart Manager:
    >node pokemartManager.js

    c) If you are the PokeMart Supervisor:
    >node pokemartSupervisor.js

2) Following the step 1 choose from the selection using your arrow keys and press enter:
    #### Lists of Choices

    * PokeMart Customer
        * View Inventory
        * Buy
        * Bored?
        * Exit

     * PokeMart Manager
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add new Product
        * Exit
    
     * PokeMart Supervisor
        * View Product Sales by Department
        * Create New Department
        * Exit
        
3) Once you have selected one of the choices from the specified list, the easy to use prompts will guide you with the remainder of information.

# Technologies Used

* Javascript
* Node.js 
    * NPM Packages -> cli-table2, MySQL, Inquirer
* MySQL WorkBench
* MySQL

# Author

Phillip Chang