const router = require('express').Router();
const path = require('path');

router.use('/upload', require('./upload'));

router.get('/read', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/read.html'));
});

router.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/edit.html'));
});

router.use('/', (req, res) => {
    res.redirect('/read');
});

module.exports = router;