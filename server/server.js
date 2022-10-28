require("dotenv").config()

const express = require('express')
const app = express()
const port = 8081

const authRoutes = require('./routes/authRoutes')

// parse request of content-type: application/json
app.use(express.json())

app.use(authRoutes)

app.get('/', (req, res) => {
    res.send('karaoke GET')
})

app.post('/', (req, res) => {
    res.send('karaoke POST')
})

app.listen(port, () => {
    console.log("server listening port:", port)
})