const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('*', (req, res) => {
  fs.createReadStream(path.join(__dirname, '../public/index.html')).pipe(res);
});

module.exports = router;
