import { response } from "express";
import bcryptjs from "bcryptjs";
import userModels from "../models/user.models.js";
import { generarJWT } from "../helpers/generarJWT.js";

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await userModels.findOne({ correo });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - Correo",
      });
    }

    // Si el usuario esta activo
    if (!user.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado : false",
      });
    }

    // Verificar la constraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export { login };
