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