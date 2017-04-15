require('dotenv').load()
require('./config').connect(process.env.PATH || process.env.MONGODB_URI_TESTING)