const UserModel = require('../config/sequelize').UserModel
const sequelize = require ('../config/sequelize').sequelize

async function getAllUsers() {
    try {
      //await sequelize.authenticate()
      const users = await UserModel.findAll()
  
      return users
    } catch (error) {
      return null
    } finally {
      //await sequelize.close();
    }
}

async function createUser() {
    try {

      //await sequelize.authenticate();

      const newUser = await UserModel.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        updatedAt: new Date(),
      })
      return newUser
    } catch (error) {
      throw new Error(error)
    } finally {
      //await sequelize.close()
    }
}

module.exports = {
  getAllUsers,
  createUser
}