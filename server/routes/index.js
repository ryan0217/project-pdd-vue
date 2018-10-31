const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('*', (req, res) => {
  fs.createReadStream('../public/index.html').pipe(res);
});

module.exports = router;
