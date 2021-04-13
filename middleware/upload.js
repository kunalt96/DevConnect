const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + path.extname(file.originalname));
  },
});
let fileFilter = function (req, file, cb) {
  var allowedMimes = ['image/', 'image/jpeg', 'image/jpg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log('-----------------------------------------------');
    cb(
      {
        success: false,
        message: 'Invalid file type. Only jpg, png image files are allowed.',
      },
      false
    );
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: fileFilter,
}).single('profilePic');

module.exports = function (req, res, next) {
  upload(req, res, function (error) {
    console.log('here', req.file);
    if (error) {
      console.log(error);
      console.log('its coming here');
      return res.status(500).json({ message: error.message });
    } else {
      next();
    }
  });
};
