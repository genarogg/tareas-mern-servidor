const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors")
/* crear servidor */
const app = express();

/* Conectar a la base de datos */
conectarDB();

/* habilitar cors */
app.use(cors())
/* Habilitar express.json */
app.use(express.json({ extended: true }));

/* puerto de la app */
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('La app esta funcionando')

})

/* importar rutas */
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));
/* arrancar el app */
app.listen(PORT,'0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el port ${PORT}`);
});

console.log("Todo bien")