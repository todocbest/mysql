const express = require('express');
const router = express.Router();
const { addSentence, getSentences } = require('../models/Sentence');

// 새 문장 추가
router.post('/sentences', async (req, res) => {
  try {
    const id = await addSentence(req.body);
    res.status(201).json({ message: 'Sentence added!', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 문장 가져오기
router.get('/sentences', async (req, res) => {
  try {
    const sentences = await getSentences();
    res.status(200).json(sentences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
