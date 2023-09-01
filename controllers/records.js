const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// Create a new record
router.post('/create', async (req, res) => {
  try {
    const { id , title, description } = req.body;

    const record = new Record({
      id,
      title,
      description
    });

    await record.save();

    res.status(201).json({ message: 'Record created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Retrieve list of records
router.get('/list', async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Retrieve a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a record by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const record = await Record.findByIdAndUpdate(req.params.id , { title, description }, { new: true });
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a record by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const record = await Record.findByIdAndRemove(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
