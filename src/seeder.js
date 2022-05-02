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

// import to db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)

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
