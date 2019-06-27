DROP DATABASE IF EXISTS pokemartDB;

CREATE DATABASE pokemartDB;

USE pokemartDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Pokeballs","Equipment",20.99,50),
("Antidote","Meds",10.25,200),
("Escape Rope","Equipment",5.35,30),
("Super Potion","Meds",70.45,25),
("Rare Candy","Specialty",120.55,5),
("Ultra Ball","Equipment",120.15,20),
("Poke Doll","General",9.99,25),
("Surf Mail","General",9.99,15),
("Rare Candy Bar","Specialty",25.98, 45),
("Revive", "Meds",150.29,10);