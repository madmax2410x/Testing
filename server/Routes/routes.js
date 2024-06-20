// backend/routes/router.js
const express = require('express');
const router = express.Router();
const SystemDetail = require('../Models/model'); // Adjusted import path

// Middleware function to fetch system detail by ID
async function getSystemDetail(req, res, next) {
  let systemDetail;
  try {
    systemDetail = await SystemDetail.findById(req.params.id);
    if (systemDetail == null) {
      return res.status(404).json({ message: 'Cannot find system detail' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.systemDetail = systemDetail;
  next();
}

// Get all system details
router.get('/', async (req, res) => {
  try {
    const details = await SystemDetail.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific system detail
router.get('/:id', getSystemDetail, (req, res) => {
  res.json(res.systemDetail);
});

// Add a new system detail
router.post('/', async (req, res) => {
  const detail = new SystemDetail({
    slNo: req.body.slNo,
    model: req.body.model,
    mgmtIP: req.body.mgmtIP,
    kvmIP: req.body.kvmIP,
    owner: req.body.owner,
    rackDetails: req.body.rackDetails,
    reserveTill: req.body.reserveTill,
    comments: req.body.comments,
    status: req.body.status // Include status in the request body
  });

  try {
    const newDetail = await detail.save();
    res.status(201).json(newDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing system detail
router.put('/:id', getSystemDetail, async (req, res) => {
  // Update the existing system detail with the new values
  res.systemDetail.slNo = req.body.slNo;
  res.systemDetail.model = req.body.model;
  res.systemDetail.mgmtIP = req.body.mgmtIP;
  res.systemDetail.kvmIP = req.body.kvmIP;
  res.systemDetail.owner = req.body.owner;
  res.systemDetail.rackDetails = req.body.rackDetails;
  res.systemDetail.reserveTill = req.body.reserveTill;
  res.systemDetail.comments = req.body.comments;
  res.systemDetail.status = req.body.status; // Update status as well

  try {
    const updatedDetail = await res.systemDetail.save();
    res.json(updatedDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
