import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import userAuth from './src/routes/userAuth.js'
import workspace from './src/routes/workspace.js'
import workspaceElement from './src/routes/workspaceElement.js'

const app = express()
const port = process.env.PORT

const corsOptions = {
    "origin": "http://localhost:5174",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

mongoose.connect(process.env.MONGODB_DATABASE_URL)
    .then(console.log('database connected'))
    .catch((err) => console.log(err))

app.use(cors(corsOptions))
app.use(express.json())

// routes
app.use('/auth', userAuth)
app.use('/workspace', workspace)
app.use('/workspace-element', workspaceElement)

app.get('/database-collections', async (req, res) => {
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(collections)
    res.send(collections)
})

app.listen(port, () => {
    console.log(`Your app is listening on port: ${port}`)
})