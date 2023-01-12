import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarCategoria,
  borrarCategoria,
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
} from "../controllers/categorias.controller.js";
import { existeCategoriaPorId } from "../helpers/DB-validators.js";

import {
  esAdminRole,
  validarCampos,
  validarJWT,
} from "../middlewares/index.js";

const routerCategorias = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico
routerCategorias.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
routerCategorias.get(
  "/:id",
  [
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un token válido
routerCategorias.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar - privado - cualquier con token valido
routerCategorias.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoria - Admin
routerCategorias.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

export { routerCategorias };
