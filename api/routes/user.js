import express from 'express';
import { accountActivateByCode, accountActivateByLink, loggedInUser, login, register } from '../controllers/userController.js';


// initialize 
const router = express.Router();


// student routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', loggedInUser);
router.get('/activate/:token', accountActivateByLink);
router.post('/activate-code', accountActivateByCode);



// export moudle
export default router;