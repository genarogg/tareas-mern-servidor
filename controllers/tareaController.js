const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");

const { validationResult } = require("express-validator");
/* Crea una nueva tarea */
exports.crearTarea = async (req, res) => {
  /* revisar si hay errores */
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  /* Extraer el proyecto y comprobar si existe */

  try {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "proyecto no encontrado" });
    }

    /* revisar si el proyecto esta autenticado */
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorisado" });
    }

    /* Creamos la tarea */
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
    /*  */
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

/* obtiene las tareas por proyecto */

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "proyecto no encontrado" });
    }

    /* revisar si el proyecto esta autenticado */
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorisado" });
    }

    /* obtener tareas por proyecto */
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

/* actualizar una tarea */
exports.actualizarTarea = async (req, res) => {
  try {
    /* extraer proyecto y ver si existe */
    const { proyecto, nombre, estado } = req.body;

    /* La tarea existe? */
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(401).json({ msg: "no existe esa tarea" });
    }

    /* extraer proyecto */
    const existeProyecto = await Proyecto.findById(proyecto);

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorisado" });
    }

    /* crear un objeto con la nueva informacion */
    const nuevaTarea = {};

    if (nombre) {
      nuevaTarea.nombre = nombre;
    }

    if (estado) {
      nuevaTarea.estado = estado;
    }

    /* guardar tarea */
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

/* eliminar tarea */
exports.eliminarTarea = async (req, res) => {
  try {
    /* extraer proyecto y ver si existe */
    const { proyecto } = req.body;

    /* La tarea existe? */
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(401).json({ msg: "no existe esa tarea" });
    }

    /* extraer proyecto */
    const existeProyecto = await Proyecto.findById(proyecto);

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorisado" });
    }

    /* Eliminar  */
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "tarea iliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
