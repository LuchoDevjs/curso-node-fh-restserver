import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

// Ver porque no anda
// import {
//   router,
//   dbConnection,
//   routerAuth,
//   routerCategorias,
//   routerProductos,
//   routerBuscar,
//   routerUpload,
// } from "../routes/index.js";

import { dbConnection } from "../database/config.db.js";
import { router } from "../routes/user.js";
import { routerAuth } from "../routes/auth.js";
import { routerCategorias } from "../routes/categorias.js";
import { routerProductos } from "../routes/productos.js";
import { routerBuscar } from "../routes/buscar.js";
import { routerUpload } from "../routes/uploads.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      usuariosPath: "/api/usuarios",
      buscarPath: "/api/buscar",
      categoriasPath: "/api/categorias",
      productosPath: "/api/productos",
      authPath: "/api/auth",
      uploadsPath: "/api/uploads",
    };

    // Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.authPath, routerAuth);
    this.app.use(this.paths.buscarPath, routerBuscar);
    this.app.use(this.paths.categoriasPath, routerCategorias);
    this.app.use(this.paths.productosPath, routerProductos);
    this.app.use(this.paths.usuariosPath, router);
    this.app.use(this.paths.uploadsPath, routerUpload);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto", this.port);
    });
  }
}

export { Server };
