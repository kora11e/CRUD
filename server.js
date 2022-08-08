const express = require('express')
const mongoose = require('mongoose')
const app = express()
const mainRoute = require('./routes/mainRoute')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/vtubers', {useNewUrlparser: true})
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/vtubers', mainRoute)
app.set('view engine', 'ejs')


app.listen(4000, () => console.log("serwer działa"))