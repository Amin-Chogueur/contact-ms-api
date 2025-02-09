import { Router } from "express";
import {
  handleRegister,
  handleLogin,
} from "../controllers/usersControllers.js";

const route = Router();

route.post("/register", handleRegister);
route.post("/login", handleLogin);

export default route;
