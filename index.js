const express = require("express");
const conectarDB = require("./config/db");
/* crear servidor */
const app = express();

/* Conectar a la base de datos */
conectarDB();

/* puerto de la app */
const PORT = process.env.PORT || 4000;

/* arrancar el app */
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el port ${PORT}`);
});
