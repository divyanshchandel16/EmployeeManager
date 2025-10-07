const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const { name, email, position } = req.body;
    if (!name || !email || !position) {
      return res.status(400).json({ message: 'name, email, and position are required' });
    }
    const employee = await Employee.create({ name, email, position });
    return res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email must be unique' });
    }
    return res.status(500).json({ message: 'Failed to create employee' });
  }
});

// Read all
router.get('/', async (_req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    return res.json(employees);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch employees' });
  }
});

// Update (PUT/PATCH)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position } = req.body;
    const updated = await Employee.findByIdAndUpdate(
      id,
      { name, email, position },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    return res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email must be unique' });
    }
    return res.status(500).json({ message: 'Failed to update employee' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    return res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email must be unique' });
    }
    return res.status(500).json({ message: 'Failed to update employee' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Employee.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Employee not found' });
    return res.json({ message: 'Employee deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete employee' });
  }
});

module.exports = router;



    return res.json(updated);
  } catch (err) {
    console.error('Patch employee error:', err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email must be unique' });
    }
    return res.status(500).json({ message: 'Failed to update employee' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const removed = await Employee.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Employee not found' });
    return res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error('Delete employee error:', err);
    return res.status(500).json({ message: 'Failed to delete employee' });
  }
});

module.exports = router;


