import { response } from "express";

const usersGet = (req, res) => {
  res.json({
    msg: "get API - usersGet",
  });
};

const usersPut = (req, res) => {

  const {id} = req.params

  res.json({
    msg: "put API- usersPut",
    id
  });
};
const usersPost = (req, res) => {
  const {nombre,edad} = req.body;

  res.json({
    msg: "post API - usersPost",
    nombre,edad
  });
};
const usersDelete = (req, res) => {
  res.json({
    msg: "delete API - usersDelete",
  });
};

export { usersGet, usersPut, usersPost, usersDelete };
