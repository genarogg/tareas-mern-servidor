/* Rutas para crear usuarios */
const express = require("express");

const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usuariosController.crearUsuario
);

module.exports = router;
