const client = require('../controllers/client');
const experss = require('express');
const router = experss.Router();

router.post('/create',client.create);
router.get('/clients', client.clients);
router.put('/update',client.update);
router.delete('/delete', client.deleteClient);

module.exports = router;