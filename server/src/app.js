const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = require('./config/cors.config');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const uploadRoutes = require('./routes/upload.routes');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config();

// Rutas

// Middlewares para cliente
// Opciones avanzadas de configuración de CORS

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Uso de rutas
app.use('/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/upload', uploadRoutes);

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
