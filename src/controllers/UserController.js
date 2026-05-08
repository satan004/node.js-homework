import BaseController from './BaseController.js'
import UserService from '../services/UserService.js'

class UserController extends BaseController {
  async welcome(req, res) {
    return this.success(res, 'Hello World', null)
  }

  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers()
      return this.success(res, 'Users retrieved successfully', users)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to fetch users', 500)
    }
  }

  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body)
      return this.success(res, 'User created', user, 201)
    } catch (error) {
      console.error(error)
      return this.error(res, error.message || 'Failed to create user', 500)
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params
      const updatedUser = await UserService.updateUser(id, req.body)
      if (!updatedUser) {
        return this.error(res, 'User not found', 404)
      }

      return this.success(res, 'User updated', updatedUser)
    } catch (error) {
      console.error(error)
      return this.error(res, error.message || 'Failed to update user', 500)
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const affectedRows = await UserService.deleteUser(id)
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
