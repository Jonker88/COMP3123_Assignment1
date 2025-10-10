// routes/employeeRoutes.js
// Employee routes

import express from 'express';
import {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';
import {
  createEmployeeValidator,
  updateEmployeeValidator,
  getEmployeeByIdValidator,
  deleteEmployeeValidator
} from '../validators/employeeValidators.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/employees', getAllEmployees);

router.post('/employees', createEmployeeValidator, validate, createEmployee);

router.get('/employees/:eid', getEmployeeByIdValidator, validate, getEmployeeById);

router.put('/employees/:eid', updateEmployeeValidator, validate, updateEmployee);

router.delete('/employees', deleteEmployeeValidator, validate, deleteEmployee);

export default router;