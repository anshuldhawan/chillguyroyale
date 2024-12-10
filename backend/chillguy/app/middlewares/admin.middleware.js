// admin.middleware.js
module.exports = function adminOnly(req, res, next) {
    if (req.auth && req.auth.role === 'admin') {
      next(); // User is an admin, allow access to the route
    } else {
      res.status(403).json({ message: "Access forbidden: Admins only" });
    }
  };
  