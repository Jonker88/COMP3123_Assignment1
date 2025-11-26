import { body } from 'express-validator';

export const signupValidator = [
  body('username').isString().trim().notEmpty().withMessage('username is required'),
  body('email').isEmail().withMessage('valid email is required'),
  body('password').isString().isLength({ min: 6 }).withMessage('password min length 6')
];

export const loginValidator = [
  body('email').optional().isEmail(),
  body('username').optional().isString().notEmpty(),
  body('password').isString().notEmpty().withMessage('password is required')
];