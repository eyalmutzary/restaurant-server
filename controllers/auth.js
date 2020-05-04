const { Waiters } = require("../models");

const login = async (req, res, next) => {
  try {
    const waiter = await Waiters.findOne({ name: req.body.name });
    if (waiter) {
      // const isPasswordCorrect = await user.comparePassword(req.body.password);
      // if (isPasswordCorrect) {
      const token = await waiter.createAuthorizationToken();
      return res.send({ token });
      // }
    }
    res.status(401).send("Unauthorized");
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  // try {
  //   const user = new User({
  //     ...req.body
  //   });
  //   const createdUser = await user.save();
  //   const token = await createdUser.createAuthorizationToken();
  //   res.send({ token });
  // } catch (e) {
  //   switch (e.code) {
  //     case 11000:
  //       res.status(409).send("Email already taken");
  //       break;
  //     default:
  //       next(e);
  //   }
  // }
};

module.exports = { login, signUp };
