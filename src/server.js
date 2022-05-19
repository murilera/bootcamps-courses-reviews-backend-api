const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler.middleware')
const connectDB = require('./config/db')

const bootcamps = require('./routes/bootcamps.routes')
const courses = require('./routes/courses.routes')
const auth = require('./routes/auth.routes')
const users = require('./routes/users.routes')

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

// cookie parser
app.use(cookieParser())

// dev logging middlware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// file uploading
app.use(fileupload())

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use(errorHandler)

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
