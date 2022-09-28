const Usuario = require("../models/Usuario");
const bcriptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  /* revisar si hay errores */
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  /* extraer email y password */
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    /* guardar usuario */
    usuario = new Usuario(req.body);

    /* Hashear el password */
    const salt = await bcriptjs.genSalt(10);
    usuario.password = await bcriptjs.hash(password, salt);

    /* Guardar usuario */
    await usuario.save();

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
        expiresIn: 3600 /* segundos  */,
      },
      (error, token) => {
        if (error) throw error;
        /* mesaje de confirmacion */
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
