const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const todosRoutes = require('./routes/todos.routes');
require('dotenv').config();

// Rutas

// Middlewares para cliente
// Opciones avanzadas de configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Dominios autorizados
  methods: '*', // Métodos permitidos
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Uso de rutas
app.use('/api/todos', todosRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () =>
      console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`)
    );
    console.log('Connected to database');
  } catch (error) {
    console.log('Connection error');
  }
};

startServer();
