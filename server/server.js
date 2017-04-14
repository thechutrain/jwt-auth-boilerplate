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

// ========== start server ============
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})