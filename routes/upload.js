const router = require('express').Router();
router.use('/', (req, res) => {
    res.send('<h3>Upload</h3>');
});
/*
const multer = require('multer');
const Jimp = require('jimp');
const fs = require('fs')

const Post = require('../models/post');
const Organization = require('../models/organization');
const keys = require('../config/keys');

const storageLogo = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.user.organizationDomain + '-logo.' + file.mimetype.split('/')[1]);
  },
});

const storageWallpaper = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.user.organizationDomain + '-wallpaper.' + file.mimetype.split('/')[1]);
  },
});

const storagePostImages = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${String(Math.floor(Math.random() * 10000))}-${String(Date.now())}.${file.mimetype.split('/')[1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  if(req.user && req.user.email === 'hasan.yousef.cs@gmail.com') {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
      return;
    }
    cb('.png or .jpeg only', false);
  }
  cb('You are not me', false);
}

const uploadLogo = multer({
  storage: storageLogo,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

const uploadWallpaper = multer({
  storage: storageWallpaper,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

const uploadPostImages = multer({
  storage: storagePostImages,
});

router.post('/logo', uploadLogo.single('logo'), (req, res, next) => {
  const purePath = __dirname.substring(0, __dirname.indexOf('routes') - 1) + `/uploads/${req.body.domain}-logo`;
  const jpegPath = purePath + '.jpeg';
  const pngPath = purePath + '.png';
  if(fs.existsSync(jpegPath)) {
    Jimp.read(jpegPath, (err, img) => img.write(pngPath));
    fs.unlinkSync(jpegPath);
  }
  res.send('uploaded');
});

router.post('/wallpaper', uploadWallpaper.single('wallpaper'), (req, res, next) => {
  const purePath = __dirname.substring(0, __dirname.indexOf('routes') - 1) + `/uploads/${req.body.domain}-wallpaper`;
  const jpegPath = purePath + '.jpeg';
  const pngPath = purePath + '.png';
  if(fs.existsSync(jpegPath)) {
    Jimp.read(jpegPath, (err, img) => img.write(pngPath));
    fs.unlinkSync(jpegPath);
  }
  res.send('uploaded');
});

router.post('/postImages', uploadPostImages.array('files', 100), (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.body.postId }, {
    images: req.files.map(file => file.filename)
  }).then(p => {
    res.send('uploaded');
  });
});
*/
module.exports = router;