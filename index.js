const express = require("express");
const conectarDB = require("./config/db");
/* crear servidor */
const app = express();

/* Conectar a la base de datos */
conectarDB();

/* Habilitar express.json */
app.use(express.json({ extended: true }));

/* puerto de la app */
const PORT = process.env.PORT || 4000;

/* importar rutas */
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));

/* arrancar el app */
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el port ${PORT}`);
});
