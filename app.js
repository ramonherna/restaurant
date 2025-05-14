/**
 * Configuración general de La Delizia - Pizzería
 */
const express = require("express");
const app = express();
const db = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport-setup');

const port = 3000;

/**
 * Motor de vistas EJS
 */
app.set('view engine', 'ejs');

/**
 * Middleware para parsear datos
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Archivos estáticos
 */
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('node_modules'));

/**
 * Configuración de sesión y flash messages
 */
app.use(session({
    secret: 'LaDeliziaSuperSecreta2024',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 20 * 60000 }
}));
app.use(flash());

/**
 * Inicializar Passport
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Middleware global para el usuario logueado
 */
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

/**
 * Página principal
 */
const Pizza = require('./models/Pizza');
app.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find().lean(); // .lean() mejora rendimiento y compatibilidad con EJS
        res.render('index', { pizzas, title: "La Delizia" });
    } catch (err) {
        console.error('Error al cargar las pizzas:', err);
        res.render('index', { title: 'La Delizia', pizzas: [] });
    }
});

/**
 * Rutas del sistema
 */
app.use('/dashboard', require('./routes/dashboard.routes'));
app.use('/chef', require('./routes/chef.routes'));
app.use('/table', require('./routes/table.routes'));
app.use('/booking', require('./routes/booking.routes'));
app.use('/drink', require('./routes/drink.routes'));
app.use('/bill', require('./routes/bill.routes'));
app.use('/food', require('./routes/food.routes'));     // Puedes mantener esto si hay más que pizza
app.use('/customer', require('./routes/customer.routes'));
app.use('/waiter', require('./routes/waiter.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/pizzas', require('./routes/pizza.routes')); // Accesible vía http://localhost:3000/pizzas

/**
 * Ruta 404
 */
app.get('*', function(req, res){
    res.status(404).render('404', { title: "Página no encontrada" });
});

/**
 * Iniciar servidor
 */
app.listen(port, () => {
    console.log(`La Delizia está corriendo en http://localhost:${port}`);
});
