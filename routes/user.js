// const { Router } = require('express')
import { Router } from "express";
import {
  usersDelete,
  usersGet,
  usersPost,
  usersPut,
} from "../controllers/user.controller.js";
const router = Router();

router.get("/", usersGet);
router.put("/:id", usersPut);
router.post("/", usersPost);
router.delete("/", usersDelete);

export { router };
