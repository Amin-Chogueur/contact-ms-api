import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";

async function authRequest(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ message: "Authorized token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Request is not authorized " });
  }
}
export default authRequest;
