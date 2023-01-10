import { response } from "express";
import bcryptjs from "bcryptjs";
import Usuario from "../models/user.models.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { googleVerify } from "../helpers/google-verify.js";

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await Usuario.findOne({ correo });
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let user = await Usuario.findOne({ correo });

    if (!user) {
      // tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };
      user = new Usuario(data);
      await user.save();
    }

    // Si el usuario en DB
    if (!user.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado ",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

export { login, googleSignIn };
