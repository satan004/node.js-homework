import mysql from 'mysql2/promise'

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

let db = null

async function initDB() {
  try {
    db = await mysql.createPool(dbConfig)
    
    // Create users table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    console.log('Database connected and initialized')
    return db
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.')
  }
  return db
}

export { initDB, getDB }
export default getDB
