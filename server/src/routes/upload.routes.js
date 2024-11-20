const express = require('express');
const uploadController = require('../controllers/upload.controller');
const uploadRoutes = express.Router();

uploadRoutes.post('/:id', uploadController.uploadFile);

module.exports = uploadRoutes;
