const socketsIo = function (req, res, next) {
  req.io = io;
  next();
};

module.exports = socketsIo;
