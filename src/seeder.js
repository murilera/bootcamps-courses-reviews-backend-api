const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const path = require('path')

// load env vars
dotenv.config()

// load models
const Bootcamp = require('./models/Bootcamp.model')
const Course = require('./models/Course.model')
const User = require('./models/User.model')
const Review = require('./models/Review.model')

// connect to db
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// read JSON files
const bootcampsPath = path.join(__dirname, '/_data/bootcamps.json')
const bootcamps = JSON.parse(fs.readFileSync(bootcampsPath, 'utf-8'))

const coursesPath = path.join(__dirname, '/_data/courses.json')
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'))

const usersPath = path.join(__dirname, '/_data/users.json')
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

const reviewsPath = path.join(__dirname, '/_data/reviews.json')
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'))

// import to db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    await User.create(users)
    await Review.create(reviews)

    console.log('Data imported...'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()

    console.log('Data destroyed...'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
