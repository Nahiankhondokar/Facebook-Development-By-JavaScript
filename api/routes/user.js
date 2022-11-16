import express from 'express';
import { accountActivate, loggedInUser, login, register } from '../controllers/userController.js';


// initialize 
const router = express.Router();


// student routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', loggedInUser);
router.get('/activate/:token', accountActivate);



// export moudle
export default router;