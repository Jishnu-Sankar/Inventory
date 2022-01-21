require('dotenv').config();
const mysql = require("mysql");

const DataBase = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

DataBase.connect(error => {
  if (error) throw ('Error while creating connection', error);
  console.log("Successfully connected to database");
});


module.exports = DataBase;
