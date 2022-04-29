const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

require('dotenv').config({path:'~/Projects/Final Assignment/All_Other_Stuffs/.env'})

const host = process.env.HOST
const port = process.env.PORT

const mongourl = process.env.MONGO

mongoose.connect(mongourl, {useNewUrlParser:true, useUnifiedTopology:true})
const conn = mongoose.connection
conn.on('open', () => {
    console.log('Connected to database..........')
})

const app = express()

app.use(cors())

app.use(express.json())

const routes = require('./route/routes')
app.use('/api', routes)

app.listen(port, () => {
    console.log(`Running at http://${host}:${port}/`)
})