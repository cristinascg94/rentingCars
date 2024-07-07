const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Middleware para proteger rutas
const { protect, restrictTo, restrictToSelf } = require('../middlewares/auth.middlware');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para el inicio de sesión
router.post('/login', userController.login);

// Ruta para actualizar el perfil de usuario
// Asegúrate de que solo usuarios logueados puedan acceder a esta ruta
router.patch('/update/:userId', protect, restrictToSelf, userController.updateProfile);

// obtener todos los usuarios. Restringido. Solo para los administradores
router.get('/', protect, restrictTo('admin'), userController.getUsers);

// eliminar usuario por id. Restringido. Solo para los administradores
router.delete('/:id', protect, restrictTo('admin'), userController.deleteUser);

// obtener datos de un usuario. Solo para uno mismo en el area personal.
router.get('/:id', protect, restrictToSelf, userController.getUserById)
module.exports = router;
