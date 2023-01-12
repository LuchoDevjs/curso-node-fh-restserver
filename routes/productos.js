import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProducto,
  obtenerProductos,
} from "../controllers/productos.js";
import {
  existeCategoriaPorId,
  existeProductoPorId,
} from "../helpers/DB-validators.js";

import {
  esAdminRole,
  validarCampos,
  validarJWT,
} from "../middlewares/index.js";

const routerProductos = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico
routerProductos.get("/", obtenerProductos);

// Obtener una categoria por id - publico
routerProductos.get(
  "/:id",
  [
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerProducto
);

// Crear categoria - privado - cualquier persona con un token válido
routerProductos.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID de mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// Actualizar - privado - cualquier con token valido
routerProductos.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un ID de mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar una categoria - Admin
routerProductos.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

export { routerProductos };
