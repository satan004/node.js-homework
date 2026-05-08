import UserRepository from '../repository/UserRepository.js'

class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUsers() {
    return this.userRepository.findAll()
  }

  async getUserById(id) {
    return this.userRepository.findById(id)
  }

  async createUser(data) {
    if (!data?.name) {
      throw new Error('Name is required')
    }

    return this.userRepository.create(data)
  }

  async updateUser(id, data) {
    if (!data?.name) {
      throw new Error('Name is required')
    }

    return this.userRepository.update(id, data)
  }

  async deleteUser(id) {
    return this.userRepository.delete(id)
  }
}

export default new UserService()
