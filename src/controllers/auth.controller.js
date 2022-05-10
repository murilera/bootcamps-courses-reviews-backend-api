const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler.middleware')
const User = require('../models/User.model')

// @desc    Register user
// @route   GET /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true })
})
