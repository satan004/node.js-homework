import BaseController from './BaseController.js'
import User from '../models/User.js'

class UserController extends BaseController {
  async welcome(req, res) {
    return this.success(res, 'Hello World', null)
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll()
      return this.success(res, 'Users retrieved successfully', users)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to fetch users', 500)
    }
  }

  async createUser(req, res) {
    try {
      const { name } = req.body
      if (!name) {
        return this.error(res, 'Name is required', 400)
      }

      const user = await User.create({ name })
      return this.success(res, 'User created', user, 201)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to create user', 500)
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!name) {
        return this.error(res, 'Name is required', 400)
      }

      const updatedUser = await User.update(id, { name })
      if (!updatedUser) {
        return this.error(res, 'User not found', 404)
      }

      return this.success(res, 'User updated', updatedUser)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to update user', 500)
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const affectedRows = await User.delete(id)
      if (!affectedRows) {
        return this.error(res, 'User not found', 404)
      }

      return this.success(res, 'User deleted', null)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to delete user', 500)
    }
  }
}

export default new UserController()
