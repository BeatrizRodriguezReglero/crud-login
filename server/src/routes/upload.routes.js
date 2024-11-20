const express = require('express');
const uploadController = require('../controllers/upload.controller');
const uploadRoutes = express.Router();

uploadRoutes.post('/', uploadController.uploadFile);

module.exports = uploadRoutes;
