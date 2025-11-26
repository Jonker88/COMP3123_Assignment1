
import Employee from '../models/Employee.js';
export const getAllEmployees = async (req, res, next) => {
  try {
    const docs = await Employee.find({}).sort({ created_at: -1 });
    const out = docs.map((d) => ({
      employee_id: String(d._id),
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      position: d.position,
      salary: d.salary,
      date_of_joining: d.date_of_joining,
      department: d.department,
      photo: d.photo || null
    }));
    res.status(200).json(out);
  } catch (err) {
    next(err);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`;
    }

    const emp = await Employee.create(data);
    res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: String(emp._id)
    });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Employee with this email already exists';
    }
    next(err);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const { eid } = req.params;
    const d = await Employee.findById(eid);
    if (!d) return res.status(404).json({ status: false, message: 'Employee not found' });

    res.status(200).json({
      employee_id: String(d._id),
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      position: d.position,
      salary: d.salary,
      date_of_joining: d.date_of_joining,
      department: d.department,
      photo: d.photo || null
    });
  } catch (err) {
    next(err);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { eid } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      updates.photo = `/uploads/${req.file.filename}`;
    }

    const d = await Employee.findByIdAndUpdate(eid, updates, { new: true, runValidators: true });
    if (!d) return res.status(404).json({ status: false, message: 'Employee not found' });

    res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Employee with this email already exists';
    }
    next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { eid } = req.query;
    const d = await Employee.findByIdAndDelete(eid);
    if (!d) return res.status(404).json({ status: false, message: 'Employee not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};