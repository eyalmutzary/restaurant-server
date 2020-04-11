const jwtService = require("../services/jwt");
// const User = require("../models/User");

module.exports = async (req, res, next) => {
  // try {
  //   if (req.headers["authorization"]) {
  //     const jwtToken = req.headers["authorization"].split(" ")[1];
  //     const tokenData = await jwtService.verify(jwtToken);
  //     req.params.User = await User.findById(tokenData._id);
  //     req.params.User ? next() : res.status(403).send(`User isn't exist`);
  //   } else {
  //     res.status(403).send("Unauthorized");
  //   }
  // } catch (e) {
  //   switch (e.message) {
  //     case "jwt expired":
  //       res.status(403).send("jwt expired");
  //       break;
  //     default:
  //       next(e);
  //   }
  // }
};
