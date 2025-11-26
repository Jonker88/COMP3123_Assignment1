import { body, param, query } from 'express-validator';
import mongoose from 'mongoose';

export const createEmployeeValidator = [
  body('first_name').isString().trim().notEmpty(),
  body('last_name').isString().trim().notEmpty(),
  body('email').isEmail(),
  body('position').isString().trim().notEmpty(),
  body('salary').isNumeric(),
  body('date_of_joining').isISO8601().toDate(),
  body('department').isString().trim().notEmpty()
];

export const updateEmployeeValidator = [
  param('eid').custom((v) => mongoose.isValidObjectId(v)).withMessage('Invalid employee id'),
  body('first_name').optional().isString().trim().notEmpty(),
  body('last_name').optional().isString().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('position').optional().isString().trim().notEmpty(),
  body('salary').optional().isNumeric(),
  body('date_of_joining').optional().isISO8601().toDate(),
  body('department').optional().isString().trim().notEmpty()
];

export const getEmployeeByIdValidator = [
  param('eid').custom((v) => mongoose.isValidObjectId(v)).withMessage('Invalid employee id')
];

export const deleteEmployeeValidator = [
  query('eid').custom((v) => mongoose.isValidObjectId(v)).withMessage('Invalid employee id')
];