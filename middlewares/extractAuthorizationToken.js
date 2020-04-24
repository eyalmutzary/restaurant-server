const jwtService = require("../services/jwt");
const { Waiters } = require("../models");

module.exports = async (req, res, next) => {
  next();
  // try {
  //   if (req.headers["authorization"]) {
  //     const jwtToken = req.headers["authorization"].split(" ")[1];
  //     const tokenData = await jwtService.verify(jwtToken);
  //     req.params.Waiters = await Waiters.findOne({ id: tokenData._id });
  //     req.params.Waiters ? next() : res.status(403).send(`Waiter isn't exist`);
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
