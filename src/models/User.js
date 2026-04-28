import getDB from '../config/db.js'

class User {
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  static async findAll() {
    const db = getDB()
    const [rows] = await db.query('SELECT * FROM users')
    return rows.map(({ id, name }) => new User(id, name))
  }

  static async create({ name }) {
    const db = getDB()
    const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name])
    return new User(result.insertId, name)
  }

  static async update(id, { name }) {
    const db = getDB()
    const [result] = await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id])
    return result.affectedRows
  }

  static async delete(id) {
    const db = getDB()
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result.affectedRows
  }
}

export default User
