import Rol from "../models/rol.js";
import Usuario from "../models/user.models.js";
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js"

// Ver por que no me deja importar de esta manera
// import {Categoria,Usuario} from '../models/index.js'

const esRolValido = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la DB`);
  }
};

const esEmailValido = async (correo = "") => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El email ${correo} ya existe, pruebe con otro`);
  }
};
const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

// Categorias
const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

// Productos
const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

export {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
};
