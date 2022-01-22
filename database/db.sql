CREATE DATABASE IF NOT EXISTS inventory;

USE inventory;

CREATE TABLE IF NOT EXISTS products (
  id_product INT(10) PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(50) DEFAULT NULL,
  price INT(10) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS warehouses (
  id_warehouse INT(10) PRIMARY KEY AUTO_INCREMENT,
  warehouse_name VARCHAR(50) DEFAULT NULL,
  stock_limit INT(10) DEFAULT 0,
  available_space INT(10) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS warehouse_stocks (
  id_stock INT(10) PRIMARY KEY AUTO_INCREMENT,
  id_warehouse INT(10) NOT NULL,
  id_product INT(10) NOT NULL,
  stock_qty INT(10) DEFAULT 0
);

-- DROP TABLE IF EXISTS `warehouse_stocks`;
-- DROP TABLE IF EXISTS `warehouses`;
-- DROP TABLE IF EXISTS `products`; 
-- DROP DATABASE IF EXISTS `inventory`;