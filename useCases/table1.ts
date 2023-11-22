const User = require('../models/User');

async function getAllUsers() {
    try {
      // Find all users in the 'users' table
      const users = await User.findAll();
  
      // Log or process the retrieved users
      console.log('All users:', users);
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
}

async function createUser(user) {
    try {
      // Find all users in the 'users' table
      const newUser = await User.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
  
      // Log or process the retrieved users
      return newUser
    } catch (error) {
      console.error('Error retrieving users:', error);
      return null
    }
}