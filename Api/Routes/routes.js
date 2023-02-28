const express = require('express');
const router = express.Router();
const loginController = require('../Controller/authController');
const imageController = require('../Controller/imageController')
const middleware = require('../Middleware/authMiddleware');

// const controller = require('../Controller/AuthData');
// const Middleware=require('../MiddleWare/Crud.mw')



// router.post('/login',imageController.login)
router.put('/upuser',middleware.isLoggedIn,loginController.updateuser)
router.post('/signup',imageController.registration)
router.get('/users',imageController.showUsers)
router.post('/login',loginController.login);
router.post('/uploadimg',middleware.isLoggedIn,imageController.upload,imageController.postimg);
router.get('/getimg',middleware.isLoggedIn,imageController.getimages);
router.delete('/delimg',middleware.isLoggedIn,imageController.deleteimages);


module.exports = router;