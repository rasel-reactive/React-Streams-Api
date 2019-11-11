const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const User = require('./model/user')
const Post = require('./model/post')

const app = express()
app.use(express.json())
app.use(cors())


app.get('/streams', (req, res, next)=>{
  Post.find()
  .then(posts=>{
    res.send(posts)
  })
})
app.get('/streams/:id', (req, res, next)=>{
  Post.findById(req.params.id)
  .then(posts=>{
    res.send(posts)
  })
})

app.post('/streams', async (req, res, next)=>{
  let newPost = new Post({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description
  })
  newPost = await newPost.save()
  res.send(newPost)
})

app.put('/streams/:id', (req, res, next)=>{
  let newUser = {
    title: req.body.title,
    description: req.body.description
  }   

  Post.findByIdAndUpdate( req.params.id, 
      newUser,
      { new: true }
    )
    .exec((err, result)=>{
      console.log(result);
      console.log(err)     
      res.send(result)
    })
})










app.get('/users', (req, res, next)=>{
  User.find()
  .then(users=>{
    res.send(users)
  })
})

app.get('/users/:userId', (req, res, next)=>{
  User.findById(req.params.userId)
  .then(user=>{
    res.send(user)
  })
})





app.post('/createUser', async (req, res, next)=>{
  let newUser = new User({
    name: req.body.name,
    email: req.body.email
  })
  newUser = await newUser.save()
  res.send(newUser)
})




app.delete('/streams/:id', async (req, res, next)=>{
  let result = await Post.findByIdAndRemove(req.params.id)
  res.send(result)
})



const server = http.createServer(app)
mongoose.connect('"mongodb+srv://rasel:12345@cluster0-qthsr.mongodb.net/test?retryWrites=true&w=majority"')
// mongoose.connect('mongodb://localhost/fakeData')
.then(res=>{
  server.listen(4000, ()=>console.log(`server is running on port 4000`))
  console.log('Database Connected.');
})
.catch(err=>console.log(err))