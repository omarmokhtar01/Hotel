const mysql = require('mysql2/promise')
const createTableQueries = require("../utils/tablesQuery");

async function connectDB() {
  try {
    return await mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      database:process.env.DATABASE,
      port:process.env.PORT_SQL,
    });
  } catch (error) {
    console.error('Error connecting to database: ', error);
    
  }
}

async function checkTablesExist() {
  try {
    const connection = await connectDB();

const [rows] = await connection.execute("SHOW TABLES LIKE 'users'");
return rows.length > 0; // If users table exists, return true
} catch (error) {
    console.log('Error checking tables: ', error);
    return false;
  }
}

async function createTables() {
  try {
    const connection = await connectDB();

for (const query of createTableQueries) {
  await connection.execute(query);
}

console.log('Tables created successfully.');
} catch (error) {
    console.log('Error creating tables: ', error);
  }
}

async function startServer() {
  const tablesExist = await checkTablesExist();

if (!tablesExist) {
    await createTables();
  } else {
    console.log('Tables already exist. Skipping table creation.');
    console.log('Database is connected');
  }
}

module.exports = startServer