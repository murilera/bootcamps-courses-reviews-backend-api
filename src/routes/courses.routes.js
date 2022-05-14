const express = require('express')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses.controller')

const Courses = require('../models/Course.model')
const advancedResults = require('../middleware/advancedResults.middleware.')
const { protect } = require('../middleware/auth.middleware')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Courses, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(protect, addCourse)
router
  .route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse)

module.exports = router
