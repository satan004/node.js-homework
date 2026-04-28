import User from '../models/User.js'

class UserController {
  async welcome(req, res) {
    res.send('Hello World')
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch users' })
    }
  }

  async createUser(req, res) {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(400).json({ error: 'Name is required' })
      }

      const user = await User.create({ name })
      res.status(201).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to create user' })
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!name) {
        return res.status(400).json({ error: 'Name is required' })
      }

      const affectedRows = await User.update(id, { name })
      if (!affectedRows) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json({ message: 'User updated' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to update user' })
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const affectedRows = await User.delete(id)
      if (!affectedRows) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json({ message: 'User deleted' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to delete user' })
    }
  }
}

export default new UserController()
