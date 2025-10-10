import express from 'express';
import { signup, login } from '../controllers/userController.js';
import { signupValidator, loginValidator } from '../validators/userValidators.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/signup', signupValidator, validate, signup);

router.post('/login', loginValidator, validate, login);

export default router;