const express = require('express')

const Review = require('../models/Review.model')
const advancedResults = require('../middleware/advancedResults.middleware.')
const { protect, authorize } = require('../middleware/auth.middleware')
const { getReviews } = require('../controllers/reviews.controller')

const router = express.Router({ mergeParams: true })

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }),
  getReviews
)

module.exports = router
