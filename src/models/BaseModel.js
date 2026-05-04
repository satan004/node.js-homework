export default class BaseModel {
  // Abstract method: get all records
  static async get() {
    throw new Error('Method "get" must be implemented by subclass')
  }

  // Abstract method: create a new record
  static async create(data) {
    throw new Error('Method "create" must be implemented by subclass')
  }

  // Abstract method: update a record by id
  static async update(id, data) {
    throw new Error('Method "update" must be implemented by subclass')
  }

  // Abstract method: delete a record by id
  static async delete(id) {
    throw new Error('Method "delete" must be implemented by subclass')
  }

  // Abstract method: find a record by id
  static async find(id) {
    throw new Error('Method "find" must be implemented by subclass')
  }
}