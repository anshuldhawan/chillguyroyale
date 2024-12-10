const rateLimit = require('express-rate-limit');

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 45 * 1000, // 45 seconds
  max: 4, // limit each IP to 4 requests per windowMs
  handler: function (req, res /* next */) {
    return res.status(429).json({
      status: 'false',
      message: 'You sent too many requests. Please wait for a while then try again',
    });
  },
});
// Use the limit rule as an application middleware
// app.use(apiRequestLimiter);

module.exports = apiRequestLimiter;
