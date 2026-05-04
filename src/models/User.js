import getDB from '../config/db.js'
import BaseModel from './BaseModel.js'

class User extends BaseModel {
  constructor(id, name) {
    super()
    this.id = id
    this.name = name
  }

  static async get() {
    const db = getDB()
    const [rows] = await db.query('SELECT * FROM users')
    return rows.map(({ id, name }) => new User(id, name))
  }

  static async find(id) {
    const db = getDB()
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id])
    if (!rows.length) return null
    return new User(rows[0].id, rows[0].name)
  }

  static async create(data) {
    const db = getDB()
    const { name } = data
    const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name])
    return new User(result.insertId, name)
  }

  static async update(id, data) {
    const db = getDB()
    const { name } = data
    const [result] = await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id])
    if (!result.affectedRows) return null
    return this.find(id)
  }

  static async delete(id) {
    const db = getDB()
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result.affectedRows
  }

  // Keep the old methods for backward compatibility
  static async findAll() {
    return this.get()
  }

  static async findById(id) {
    return this.find(id)
  }
}

export default User
