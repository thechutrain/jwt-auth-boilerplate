const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
require('dotenv').load()

// ========== Create express app ============
const app = express()
const PORT = process.env.PORT || 3000

// ========== middleware ============
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// set up handlebars
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials')
}))
// set up passport

// testing 
app.get('/', (req, res) => { res.json({ msg: 'hello world' })})

// ========== start server ============
// connect to the database
require('./models').connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to the database ...')
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`)
    })
  })
  .catch(() => {
    console.log('Mongo DB connection error')
  })

module.exports = app