const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");

// Create a connection pool
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log("Successfully connected to the database.");
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  });

module.exports = pool;
