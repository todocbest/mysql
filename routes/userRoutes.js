const express = require('express');
const router = express.Router();
const { addUser, getUsers } = require('../models/User');

// 새 사용자 추가
router.post('/users', async (req, res) => {
  try {
    const userId = await addUser(req.body);
    res.status(201).json({ message: 'User added successfully', id: userId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 모든 사용자 가져오기
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
