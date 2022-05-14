const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps.controller')

const Bootcamp = require('../models/Bootcamp.model')
const advancedResults = require('../middleware/advancedResults.middleware.')

// include other resource routers
const courseRouter = require('./courses.routes')
const { protect } = require('../middleware/auth.middleware')

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp)
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)
router.route('/:id/photo').put(protect, bootcampPhotoUpload)

module.exports = router
