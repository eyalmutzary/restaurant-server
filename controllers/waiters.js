const { Waiters } = require("../models");

const getWaiters = async (req, res) => {
  // const users = await User.find().select("-password");
  // res.send(users);
};

const deleteWaiter = async (req, res) => {
  // const deletedUser = await User.deleteOne({ email: req.query.email });
  // res.send(deletedUser);
};

module.exports = { getWaiters, deleteWaiter };
