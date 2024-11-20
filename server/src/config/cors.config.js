const corsOptions = {
  origin: 'http://localhost:5173', //'http://localhost:5173' Dominios autorizados
  methods: '*', // Métodos permitidos
  optionsSuccessStatus: 204,
  credentials: true
};

module.exports = corsOptions;
