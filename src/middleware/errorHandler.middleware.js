const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // log to console for dev
  console.log(err.stack.red)

  // mongoose bad objectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = new ErrorResponse(message, 404)
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicated field value entered'
    error = new ErrorResponse(message, 400)
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler
