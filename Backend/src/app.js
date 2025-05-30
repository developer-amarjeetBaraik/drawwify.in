import express from 'express'
import 'dotenv/config'
import cors from 'cors'

const app = express()
const port = process.env.PORT

const corsOptions = {
    "origin": "http://localhost:5173",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    console.log(req.url)
    res.send('Hello there, app is listening...')
})

app.get('/add', (req, res) => {
    console.log(req.url)
    res.send('this page is to add data..')
})

app.listen(port, () => {
    console.log(`Your app is listening on port: ${port}`)
})