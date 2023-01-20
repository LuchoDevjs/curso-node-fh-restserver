import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarArchivo,
  cargarArchivo,
  mostrarImagen,
  actualizarArchivoCloudinary,
} from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/DB-validators.js";

import { validarCampos, validarArchivoSubir } from "../middlewares/index.js";

const routerUpload = Router();

routerUpload.post("/", validarArchivoSubir, cargarArchivo);

routerUpload.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarArchivoCloudinary
);
//   ],
//   actualizarArchivo
// );

routerUpload.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

export { routerUpload };
