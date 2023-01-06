import { response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/user.models.js";

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el ususario que corresponda al uid
    const user = await Usuario.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "token no valido - usuario no existe en DB",
      });
    }
    // verificar si el uid tiene estado en true
    if (!user.estado) {
      return res.status(401).json({
        msg: "token no valido - usuario con estado : false",
      });
    }
    req.usuario = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "token no valido",
    });
  }
};

export { validarJWT };
