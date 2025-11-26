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
import Employee from '../models/Employee.js';
import {
  createEmployeeValidator,
  updateEmployeeValidator,
  getEmployeeByIdValidator,
  deleteEmployeeValidator
} from '../validators/employeeValidators.js';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/employees/search', auth, async (req, res, next) => {
  try {
    const { department, position } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (position) filter.position = position;

    const docs = await Employee.find(filter).sort({ created_at: -1 });
    const out = docs.map((d) => ({
      employee_id: String(d._id),
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      position: d.position,
      salary: d.salary,
      date_of_joining: d.date_of_joining,
      department: d.department,
      photo: d.photo
    }));
    res.status(200).json(out);
  } catch (err) {
    next(err);
  }
});

router.get('/employees', auth, getAllEmployees);

router.post(
  '/employees',
  auth,
  upload.single('photo'),
  createEmployeeValidator,
  validate,
  createEmployee
);

router.get('/employees/:eid', auth, getEmployeeByIdValidator, validate, getEmployeeById);

router.put(
  '/employees/:eid',
  auth,
  upload.single('photo'),
  updateEmployeeValidator,
  validate,
  updateEmployee
);

router.delete('/employees', auth, deleteEmployeeValidator, validate, deleteEmployee);

export default router;