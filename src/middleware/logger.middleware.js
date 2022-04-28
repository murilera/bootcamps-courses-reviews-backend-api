// @desc    Logs request to console
const logger = (req, res, next) => {
  const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

  console.log(
    `${date} - ${req.method} ${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`
  )
  next()
}

module.exports = logger
