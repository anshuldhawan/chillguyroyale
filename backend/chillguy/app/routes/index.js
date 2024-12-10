const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const error = require("../middlewares/error.middleware");
require("../../config/database")();
require("express-async-errors");
const { expressjwt: jwt } = require("express-jwt");
const { JWT_SECRET } = require("../../config/envs");
const Users = require("../model/userModal");
const route_user = require("./user.routes");
const route_questions = require("./questions.routes");
const route_credit = require("./credit.routes");
const { NotFoundError } = require("../errors/not_found_error");

module.exports = function (server) {
  /**
   * Middlewares
   */
  server.use(morgan("common"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(helmet());
  server.use(cors());
  server.use((req, res, next) => {
    res.header('Cross-Origin-Resource-Policy', 'cross-origin'); 
    next();
  });
  server.use('/api/uploads', express.static('uploads'));
  server.use(
    jwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
      path: ["/api/v1/user/login", "/api/v1/user/sign", "/api/v1/questions/leaderBoard"],
    })
  );
  server.use(async (req, res, next) => {
    if (req.auth && req.auth.id) {
      req.auth = await Users.findById(req.auth.id).select("-password");
    }
    next();
  });
  server.use("/api/v1/user", route_user);
  server.use("/api/v1/questions", route_questions);
  server.use("/api/v1/credit", route_credit);
  // catch 404 and forward to error handler
  server.use(async () => {
    throw new NotFoundError("route Not Found");
  });
  // error handling middleware
  server.use(error);
};
