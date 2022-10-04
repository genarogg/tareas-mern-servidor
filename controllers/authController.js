const Usuario = require("../models/Usuario");
const bcriptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  /* revisar si hay errores */
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  /* extraer email y password */
  const { email, password } = req.body;

  try {
    /* revisar qeu se un usuario registrado */
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "El usario no existe" });
    }

    /* revisar password */
    const passCorrecto = await bcriptjs.compare(password, usuario.password);

    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }

    /* si todo es correcto */
    /* Crear y firmar el JWT */
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    /* firmar el JWT     */
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600000000 /* segundos  */,
      },
      (error, token) => {
        if (error) throw error;
        /* mesaje de confirmacion */
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

/* obtiene el usuario autenticado */
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
