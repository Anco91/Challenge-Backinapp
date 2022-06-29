const streamParse = require('../controllers/streamParse');
const experss = require('express');
const router = experss.Router();

router.get('/export',streamParse.exportCsv);

module.exports = router;
