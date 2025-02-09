import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function handleRegister(req, res) {
  try {
    const formData = req.body;
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "This email is already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "Account created successfully.", newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message:
          "An error occurred while creating the account. Please try again.",
      });
  }
}

export async function handleLogin(req, res) {
  try {
    const formData = req.body;
    const { email, password } = formData;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    const dataToken = {
      _id: user._id,
      username: user.username,
    };
    const token = jwt.sign(dataToken, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "Login successful.", token, username: user.username });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during login. Please try again." });
  }
}
