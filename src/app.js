const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require("./routes/index");
const http = require("http");
require('./bd/conexion.js');
const initSocket = require("./sockets/socket");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine({
      extname: '.handlebars',
      defaultLayout: 'main',
      partialsDir: path.join(__dirname, 'views', 'partials'),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"))


app.use("/", routes);

module.exports = { app, server };