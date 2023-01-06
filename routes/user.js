// const { Router } = require('express')
import { Router } from "express";
import { check } from "express-validator";

import { validarCampos,validarJWT,esAdminRole,tieneRol } from "../middlewares/index.js";

import {
  esEmailValido,
  esRolValido,
  existeUsuarioPorId,
} from "../helpers/DB-validators.js";

import {
  usersDelete,
  usersGet,
  usersPost,
  usersPut,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", usersGet);
router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usersPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraeña tiene que tener como minimo 6 letas"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(esEmailValido),
    // check("rol", "No es un rol valido").isIn("ADMIN_ROLE", "USER_ROLE"),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usersPost
);
router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usersDelete
);

export { router };
