import express from 'express';
import { loggedInUser, login, register } from '../controllers/userController.js';


// initialize 
const router = express.Router();


// student routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', loggedInUser);



// export moudle
export default router;