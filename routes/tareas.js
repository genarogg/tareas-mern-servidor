const express = require("express");
const router = express.Router();

const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");

const { check } = require("express-validator");

/* crear tarea */
/* api/tareas */
router.post(
  "/",
  auth,
  [check("nombre", "el nombre es obligatorio").not().isEmpty(),
  check("proyecto", "el proyecto es obligatorio").not().isEmpty()],
  tareaController.crearTarea
);

/* obtener las tareas por proyecto */
router.get("/",auth, tareaController.obtenerTareas)



/* actualizar las tareas por proyecto */
router.put("/:id",auth, tareaController.actualizarTarea)

/* actualizar las tareas por proyecto */
router.delete("/:id",auth, tareaController.eliminarTarea)


module.exports = router;
