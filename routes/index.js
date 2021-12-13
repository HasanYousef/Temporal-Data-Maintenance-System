const router = require('express').Router();
const path = require('path');
const fetch = require("node-fetch");
let base64 = require('base-64');

router.use('/upload', require('./upload'));
const Event = require('../models/event');

router.get('/search', async (req, res) => {
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
    let query = req.query;
    const name = query.patientName.split(' ');
    if(name.length !== 2)
        return {};

    let today = new Date();
    let hh = String(today.getHours());
    let min = String(today.getMinutes());
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    hh = hh.length === 1 ? '0' + hh : hh;
    min = min.length === 1 ? '0' + min : min;
    if(!query.date){
        query.date = today;
        query.time = hh + ':' + min;
    }
    else if(!query.time) {
        query.time = '23:59';
    }
    
    if(!query.validDate){
        query.validDate = today;
        query.validTime = hh + ':' + min;
    }
    else if(!query.validTime) {
        query.validTime = '23:59';
    }
    let dbQuery = {
        firstName: name[0],
        lastName: name[1],
        loincNum: query.loincCode,
        validStartTime: {
            $lte: new Date(`${query.validDate}T${query.validTime}:00Z`),
        },
        transactionTime: {
            $lte: new Date(`${query.date}T${query.time}:00Z`),
        },
        $or: [{
            deletedAt: {
                $gte: new Date(`${query.date}T${query.time}:00Z`)
            }
        }, {
            deletedAt: null
        }],
    };
    let doc = ((await Event.find(dbQuery).sort({validStartTime: -1}).lean())[0]);
    if(doc){
        doc.loincDescription =  await codeToLongCommonName(doc.loincNum);
        res.send(doc);
    }
    else
        res.send({});
});

router.post('/delete', async (req, res) => {
    const query = req.body;
    const name = query.patientName.split(' ');
    if(name.length !== 2){
        return {};
    }
    let dbQuery = {
        firstName: name[0],
        lastName: name[1],
        loincNum: query.loincCode,
        validStartTime: new Date(`${query.validDate}T${query.validTime}:00Z`),
        //transactionTime: new Date(`${query.date}T${query.time}:00Z`),
    };
    let wanted = await Event.findOne(dbQuery);
    if(wanted.deletedAt === null){
        wanted.deletedAt = new Date();
        wanted.save();
        res.status(200).send('success');
    }
    else {
        res.status(400).send('failed');
    }
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
        return 'not found'
    }
}

module.exports = router;