import getDB from '../config/db.js'
import User from '../models/User.js'

class UserRepository {
  async findAll() {
    const db = getDB()
    const [rows] = await db.query('SELECT * FROM users')
    return rows.map(({ id, name }) => new User(id, name))
  }

  async findById(id) {
    const db = getDB()
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id])
    if (!rows.length) return null
    return new User(rows[0].id, rows[0].name)
  }

  async create(data) {
    const db = getDB()
    const { name } = data
    const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name])
    return new User(result.insertId, name)
  }

  async update(id, data) {
    const db = getDB()
    const { name } = data
    const [result] = await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id])
    if (!result.affectedRows) return null
    return this.findById(id)
  }

  async delete(id) {
    const db = getDB()
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result.affectedRows
  }
}

export default UserRepository
