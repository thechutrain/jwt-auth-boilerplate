require('dotenv').load()
require('./config').connect(process.env.MONGODB_URI_TESTING)
