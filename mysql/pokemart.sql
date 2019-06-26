DROP DATABASE IF EXISTS pokemartDB;

CREATE DATABASE pokemartDB;

USE pokemartDB;

CREATE TABLE products (
    item_id INT NOT NULL,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity)
VALUES ("Pokeballs","Equipment",20.00,50),
("Antidote","Meds",10.00,200),
("Escape Rope","Equipment",5.50,30),
("Super Potion","Meds",70.00,25),
("Rare Candy","Specialty"120.00,5),
("Ultra Ball","Equipment",120.00,20),
("Poke Doll","General",10.00,25),
("Surf Mail","General",10.00,15),
("Rare Candy Bar","Specialty",30.00, 45);
("Revive", "Meds",150.00,10);