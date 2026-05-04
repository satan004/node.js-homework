import getDB from '../config/db.js'
import BaseModel from './BaseModel.js'

class Product extends BaseModel {
  constructor(id, name, price) {
    super()
    this.id = id
    this.name = name
    this.price = price
  }

  static async get() {
    const db = getDB()
    const [rows] = await db.query('SELECT * FROM products')
    return rows.map(({ id, name, price }) => new Product(id, name, price))
  }

  static async find(id) {
    const db = getDB()
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id])
    if (!rows.length) return null
    return new Product(rows[0].id, rows[0].name, rows[0].price)
  }

  static async create(data) {
    const db = getDB()
    const { name, price } = data
    const [result] = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price])
    return new Product(result.insertId, name, price)
  }

  static async update(id, data) {
    const db = getDB()
    const { name, price } = data
    const [result] = await db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id])
    if (!result.affectedRows) return null
    return this.find(id)
  }

  static async delete(id) {
    const db = getDB()
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id])
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

export default Product