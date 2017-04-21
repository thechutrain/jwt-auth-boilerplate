const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const parseTokenCookie = require('./middleware/checkAuth').parseTokenCookie
require('dotenv').load()

// ========== Create express app ============
const app = express()
app.set('x-powered-by', false)
const PORT = process.env.PORT || 3000

// ========== server bundle.js file that webpack bundles ========
app.use(express.static(path.join(__dirname, '../', '/client/dist')))

// ========== middleware ============
app.use(morgan('dev'))
app.use(cookieParser())
app.use(parseTokenCookie()) // custom middleware function I wrote to parse the cookie
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ========== routing ============
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '/index.html')) }) // react entry pt
app.use('/auth', require('./controllers/authRouter'))
app.use('/api', require('./controllers/apiRouter'))
// ========== start server ============

if (process.env.NODE_ENV !== 'testing') {
  // connect to the database
  require('./models').connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('connected to the database ...')
      app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
      })
    })
    .catch((err) => {
      console.log('Mongo DB connection error')
      console.log(err)
    })
}

module.exports = app
