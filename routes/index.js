const router = require('express').Router();
const path = require('path');
const fetch = require("node-fetch");
let base64 = require('base-64');

router.use('/upload', require('./upload'));

router.get('/read', async (req, res) => {
    if(req.query.name) {

    }
    await codeToLongCommonName(code);
    res.sendFile(path.join(__dirname, '../public/read.html'));
});

router.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/edit.html'));
});

router.use('/', (req, res) => {
    res.redirect('/read');
});

async function codeToLongCommonName(code) {
    try {
        const headers = new fetch.Headers({
            method: 'get', 
            'Authorization': 'Basic ' + base64.encode(`${process.env.LOINC_USERNAME}:${process.env.LOINC_PASSWORD}`),
        });
        const response = await fetch(
            `https://fhir.loinc.org/CodeSystem/$lookup?code=${code}&system=http%3A%2F%2Floinc.org&_format=json`,
            { headers },
        );
        // takes the LONG COMMON NAME from the response
        return (await response.json()).parameter[1].valueString;
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = router;