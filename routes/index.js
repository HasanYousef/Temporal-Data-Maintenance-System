const router = require('express').Router();
const path = require('path');

router.use('/upload', require('./upload'));

router.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/docs.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.use('/', (req, res) => {
    res.status(404).send('404');
});

module.exports = router;