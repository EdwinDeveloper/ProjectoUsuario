const PostModel = require('../config/sequelize').PostModel
const userCases = require("../useCases/user")
const sequelize = require ('../config/sequelize').sequelize

async function createPostForUser(email, ideaSummary) {
    try {
      const user = await userCases.getOneUserByEmail(email);
  
      if (!user) {
        throw Error("User doesn't exist")
      }

      const newPost = await PostModel.create({
        idea_summary: ideaSummary,
        posted_by: user.id,
        updatedAt: new Date(),
      });
      return newPost;
    } catch (error) {
      throw error;
    }
}

module.exports = {
    createPostForUser
}