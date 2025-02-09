import { Router } from "express";
import {
  handleCreatePerson,
  handleGetAllPeople,
  handleGetPerson,
  handleDeletePerson,
  handleEditPerson,
} from "../controllers/personControllers.js";
import authRequest from "../middleware/authRequest.js";

const route = Router();
route.use(authRequest);
route.get("/", handleGetAllPeople);
route.get("/:id", handleGetPerson);
route.delete("/:id", handleDeletePerson);
route.put("/:id", handleEditPerson);
route.post("/new", handleCreatePerson);

export default route;
