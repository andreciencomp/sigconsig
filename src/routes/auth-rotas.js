const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')

const authController = new AuthController();

router.get('/login', authController.login);

router.get('/login/autenticado', authController.estaAutenticado);

module.exports = router;