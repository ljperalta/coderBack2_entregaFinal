require('dotenv').config();
const listEndpoints = require('express-list-endpoints');
const { app, server } = require('./app'); // ✅ Ahora importa el server correctamente
const port = process.env.PORT || 8081; // ✅ Cambié el puerto a 8080 para evitar conflictos con el puerto 3000

//console.log(listEndpoints(app));

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});