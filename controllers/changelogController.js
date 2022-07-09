const Change = require("../models/Change");

const getChangeLog = (req, res, next) => {
  Change.find().exec((err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({ data });
    }
  });
};

module.exports = { getChangeLog };
