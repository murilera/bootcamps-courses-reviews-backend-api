const express = require('express')
const dotenv = require('dotenv')
const bootcamps = require('./routes/bootcamps.routes')
const logger = require('./middleware/logger.middleware')

// load envs
const env = dotenv.config()
if (env.error) {
  throw env.error
}

const app = express()

app.use(logger)

// mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
