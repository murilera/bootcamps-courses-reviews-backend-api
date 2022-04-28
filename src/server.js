const express = require('express')
const dotenv = require('dotenv')
const bootcamps = require('./routes/bootcamps.routes')
const morgan = require('morgan')

// load envs
const env = dotenv.config()
if (env.error) {
  throw env.error
}

const app = express()

// dev logging middlware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
