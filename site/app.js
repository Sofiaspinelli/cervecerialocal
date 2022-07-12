/* livereload */
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();

/* Entry point */
const express = require('express');
const connectLivereload = require('connect-livereload');
const path = require('path');

const app = express();
const port = 3006;

/* Archivos estaticos */
app.use(express.static(path.resolve(__dirname, 'public')));

/* Archivos estaticos monitoreados */
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

/* Rutas */
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'index.html')));
app.get('/detalle', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'detalle.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'login.html')));
app.get('/carrito', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'carrito.html')));
app.get('/productos', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'productos.html')))
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'views', '404.html')));

/* Funcion de actualizacion del servidor */
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

/* levantamos servidor */
app.listen(port, () => console.log(`servidor levantado en el puerto http:localhost:${port}`));