// const User = require("../models/User");

const getUsers = async (req, res) => {
  // const users = await User.find().select("-password");
  // res.send(users);
};

const deleteUser = async (req, res) => {
  // const deletedUser = await User.deleteOne({ email: req.query.email });
  // res.send(deletedUser);
};

module.exports = { getUsers, deleteUser };
