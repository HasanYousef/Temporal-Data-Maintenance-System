const router = require('express').Router();
const path = require('path');
const fetch = require("node-fetch");
let base64 = require('base-64');

router.use('/upload', require('./upload'));
const Event = require('../models/event');

router.get('/search', async (req, res) => {
    if(req.query.name) {

    }
    await codeToLongCommonName('code');
    res.sendFile(path.join(__dirname, '../public/search.html'));
});

router.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/edit.html'));
});

router.get('/all', async (req, res) => {
    const data = await Event.find({});
    res.send({
        count: data.length,
        data,
    });
});

router.get('/query', async (req, res) => {
    const query = req.query;
    const name = query.patientName.split(' ');
    console.log(query)
    if(name.length !== 2)
        return {};
    let dbQuery = {
        firstName: name[0],
        lastName: name[1],
        loincNum: query.loincCode,
        validStartTime: {
            $gte: new Date(`${query.validDate}T${query.validTime}:00Z`),
        },
        transactionStartTime: {
            $gte: new Date(`${query.date}T${query.time}:00Z`),
        },
    };
    res.send(await Event.find(dbQuery));
});

router.post('/delete', async (req, res) => {
    const query = req.body;
    console.log(query);
    res.send({ data: 'hello '});
    return;
    const name = query.patientName.split(' ');
    if(name.length !== 2)
        return {};
    let dbQuery = {
        loincNum: query.loincCode,
    };
    res.send(await Event.find(dbQuery)[0]);
});

router.use('/', (req, res) => {
    res.redirect('/search');
});

async function codeToLongCommonName(code) {
    try {
        const headers = new fetch.Headers({
            method: 'get', 
            'Authorization': 'Basic ' + base64.encode(`${process.env.LOINC_USERNAME}:${process.env.LOINC_PASSWORD}`),
        });
        const response = await fetch(
            `https://fhir.loinc.org/CodeSystem/$lookup?system=http%3A%2F%2Floinc.org&_format=json&code=${code}`,
            { headers },
        );
        // takes the LONG COMMON NAME from the response
        return response.ok ? (await response.json()).parameter[1].valueString : null;
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = router;