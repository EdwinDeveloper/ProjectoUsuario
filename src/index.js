const express = require('express');
const sequelized = require("../config/sequelize").sequelize;
const server = express()

const userCases = require("../useCases/user")
const postCases = require("../useCases/post")

server.use(express.json());

const PORT = 9877

async function Connection() {
    try {
      await sequelized.authenticate();
      console.log('Connection to mysql has been established successfully.');
  
      //await sequelized.close();
      //console.log('Connection has been closed.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

//testConnection()

server.post('/createPostList', async(req, res) =>{
  try{

    const requestBodyPostList = req.body

    requestBodyPostList.forEach(async(postElement)=>{
      const { email, idea_summary } = postElement
      await postCases.createPostForUser(email, idea_summary)
    })

    res.status(201).json({ message: "Posts Created"});
  }catch(error){
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
})

server.post('/post', async(req, res) =>{
  try{

    const requestBody = req.body

    const email = requestBody.email

    if(!email){
      throw Error("User email is required")
    }

    const ideaSummary = requestBody.idea_summary

    if(!ideaSummary){
      throw Error("Idea_summary is required")
    }

    await postCases.createPostForUser(email, ideaSummary)
    res.status(201).json({ message: "Post Created"});
  }catch(error){
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
})

server.get('/all', async(req, res) =>{
  try{

    let users = await userCases.getAllUsers()
    res.status(200).json({ users: users })
  } catch (error) {
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
})

server.delete('/delete', async(req, res) =>{
  try{
    const requestBody = req.body
    const userId = requestBody.id

    let message = await userCases.deleteUser(userId)
    res.status(200).json({ message: message })
  } catch (error) {
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
})

server.put('/update', async(req, res) =>{
  try{
    const requestBody = req.body

    const userId = requestBody.id

    if(userId == null || userId == undefined){
      throw Error("User id is required")
    }

    let user = await userCases.getOneUser(userId)

    let user_first_name_to_update = ""
    let user_last_name_to_update = ""
    let email_to_update = ""
    let password_to_update = ""

    if(!user){
      throw Error("User doesn't exist in the system")
    }

    const userFirstName = requestBody.user_first_name

    if(userFirstName == null || userFirstName == undefined){
      user_first_name_to_update = user.user_first_name
    }else{
      user_first_name_to_update = userFirstName
    }

    const userLastname = requestBody.user_last_name

    if(userLastname == null || userLastname == undefined){
      user_last_name_to_update = user.user_last_name
    }else{
      user_last_name_to_update = userLastname
    }

    const email = requestBody.email

    if(email == null || email == undefined){
      email_to_update = user.email
    }else{
      email_to_update = email
    }

    const password = requestBody.password

    if(password == null || password == undefined){
      password_to_update = user.password
    }else{
      password_to_update = password
    }

    const newModel = {
      user_first_name: user_first_name_to_update,
      user_last_name: user_last_name_to_update,
      email: email_to_update,
      password: password_to_update
    }

    await userCases.updateUser( userId, newModel)
    res.status(200).json({ message: "User updated" })
  } catch (error) {
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
})

server.post('/createList', async (req, res) => {
  try{

    const requestBody = req.body
    requestBody.forEach(async(user)=>{
      await userCases.createUser(
        user.user_first_name,
        user.user_last_name,
        user.email,
        user.password
      )
    })
    res.status(201).json({ success: true, message: "users created"});
  }catch(error){
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
})

server.post('/create', async (req, res) => {
  try {

    const requestBody = req.body

    const userFirstName = requestBody.user_first_name

    if(userFirstName == null || userFirstName == undefined){
      throw Error("User First Name is required")
    }

    const userLastname = requestBody.user_last_name

    if(userLastname == null || userLastname == undefined){
      throw Error("User Last Name is required")
    }

    const email = requestBody.email

    if(email == null || email == undefined){
      throw Error("Email is required")
    }

    const password = requestBody.password

    if(password == null || password == undefined){
      throw Error("Password is required")
    }

    let user = await userCases.createUser(
      userFirstName, userLastname, email, password
    )
    res.status(201).json({ success: true, message: "user created", user: user });
  } catch (error) {
    const errorMessage = (error).message;
    res.status(500).json({ error: errorMessage});
  }
});

server.listen( PORT, async ()=> {
  Connection()
    console.log("Server running on port : " + PORT)
} )