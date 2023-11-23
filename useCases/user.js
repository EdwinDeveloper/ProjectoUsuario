const UserModel = require('../config/sequelize').UserModel
const PostModel = require('../config/sequelize').PostModel

async function getAllUsers() {
  const users = await UserModel.findAll()
  return users
}

async function getOneUser(id) {
  const user = await UserModel.findByPk(id)
  return user
}

async function getOneUserByEmail(email) {
  const user = await UserModel.findOne({
    where: {
      email: email,
    },
  })
  return user
}

async function updateUser(id, updatedValues){
  const user = await UserModel.update(updatedValues, {
    where: { id: id },
    returning: true,
  })
  return user
}

async function deleteUser(id) {
    //await sequelize.authenticate()
    const deleteResponse = await UserModel.destroy({
      where: {
        id: id,
      },
    }).then((deletedRows) => {
      if (deletedRows > 0) {
        return `User with id ${id} deleted successfully.`
      } else {
        return `User with id ${id} not found.`
      }
    })
    .catch((error) => {
      return 'Error deleting user: ' + error
    })
    return deleteResponse
}

async function createUser(
  userFirstName, userLastname, email, password
) {
    try {

      //await sequelize.authenticate();

      const newUser = await UserModel.create({
        user_first_name: userFirstName,
        user_last_name: userLastname,
        email: email,
        password: password,
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
  createUser,
  deleteUser,
  getOneUser,
  updateUser,
  getOneUserByEmail
}