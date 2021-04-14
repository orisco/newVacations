const jwt = require("jsonwebtoken");


const verify = (req, res, next) => {
  const {authorization} = req.headers;
  jwt.verify(authorization, "secret", (err, payload) => {
    if (err) {
      res.status(500).json({ err: true, msg: err });
    } else {
      req.user = payload;
      next();
    }})
}

module.exports = verify;