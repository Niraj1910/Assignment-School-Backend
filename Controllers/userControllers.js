const UserModel = require("../Models/UserModel");
const { createTokenForUser } = require("../services/jwt");

async function registerHandler(req, res) {
  const registerData = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: registerData.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const newUser = await UserModel.create(registerData);

    if (newUser) {
      return res.status(201).json({ message: "User successfully registered" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function loginHandler(req, res) {
  const loginData = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: loginData.email });

    if (!existingUser || !existingUser.comparePassword(loginData.password)) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    const token = createTokenForUser(existingUser);

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ message: "Successfully Logged in" });
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handlerGetAllUsers(req, res) {
  try {
    const allUsers = await UserModel.find({}, "-password -salt");

    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handlerUpdateUser(req, res) {
  try {
    const userId = req.params.id;

    const { name, email } = req.body;
    const data = { name, email };

    const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handlerDeleteUser(req, res) {
  try {
    const userId = req.params.id;

    await UserModel.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  registerHandler,
  loginHandler,
  handlerGetAllUsers,
  handlerUpdateUser,
  handlerDeleteUser,
};
