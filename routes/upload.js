const router = require('express').Router();

const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs')

const Event = require('../models/event');

const storageFile = multer.diskStorage({
  // choose which folder to store the file on the server (temp while entering the the data into the DB)
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  // gives a name for the file (this name works if there is only one client that can upload files)
  filename: function(req, file, cb) {
    cb(null, 'data.xlsx');
  },
});

const fileFilter = (req, file, cb) => {
  // checks if the file is of the type .xlsx
  if(file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    cb(null, true);
    return;
  }
  cb('.xlsx only', false);
}

const uploadFile = multer({
  storage: storageFile,
  fileFilter,
});

router.post('/file', uploadFile.single('file'), async (req, res, next) => {
  const path = __dirname.substring(0, __dirname.indexOf('routes') - 1) + `/uploads/data.xlsx`;
  if(fs.existsSync(path)) {
    const src = XLSX.readFile(path);
    // parse the file into array of arrays (each row is an array)
    let data = XLSX.utils.sheet_to_json(src.Sheets[src.SheetNames[0]], {header:1});
    // remove the first row (header) and every empty row
    data = data.filter((row, index) => (index !== 0 && row.length > 0));
    // convert data from array of arrays (array of rows) to array of event objects (formated to the event schema)
    data = data.map(row => ({
      firstName: row[0],
      lastName: row[1],
      loincNum: row[2],
      value: row[3],
      unit: row[4],
      validStartTime: row[5],
      transactionTime: row[6],
    }));

    try {
      // if the client wants to replace all the stored data with the new data
      if(req.body.shouldReplace === 'true') {
        // remove all the previous data
        await Event.deleteMany({});
      }
      // add the new data to the DB
      await Event.insertMany(data);
      // delete the file from the files system (we don't need it anymore)
      fs.unlinkSync(path);
      res.send('success');
    }
    catch {
      // delete the file if it still exists
      if(fs.existsSync(path))
        fs.unlinkSync(path);
      res.status(400).send('failed');
    }
  }
  else
    res.status(400).send('failed');
});

module.exports = router;