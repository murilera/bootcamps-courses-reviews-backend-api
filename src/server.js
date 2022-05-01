const express = require('express')
const dotenv = require('dotenv')
const bootcamps = require('./routes/bootcamps.routes')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')

// load envs
const env = dotenv.config()
if (env.error) {
  throw env.error
}

// connect to mongodb
connectDB()

const app = express()

// body parser
app.use(express.json())

// dev logging middlware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)

  server.close(() => process.exit(1))
})
