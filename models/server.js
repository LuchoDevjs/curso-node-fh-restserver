import express from "express";
import cors from "cors";
import { router } from "../routes/user.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    // middlewares
    this.middlewares();
    // rutas de mi aplicacion
    this.routes();
  }
  middlewares() {
    // cors
    this.app.use(cors());
    // lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.usuariosPath, router);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto", this.port);
    });
  }
}

export { Server };
