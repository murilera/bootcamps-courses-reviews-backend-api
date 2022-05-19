const express = require('express')

const User = require('../models/User.model')
const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults.middleware.')
const { protect, authorize } = require('../middleware/auth.middleware')
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller')

router.use(protect)
router.use(authorize('admin'))

router.route('/').get(advancedResults(User), getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router
