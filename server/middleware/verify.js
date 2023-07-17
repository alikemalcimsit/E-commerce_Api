const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(500).json({ message: "Login Değilsin......" });
  }
  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) {
      res.status(500).json({ message: "Token Geçersiz......" });
    } else {
      req.user = user;
      next();
    }
  });
}

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(500).json({ message: "Login Değilsin......" });
    }
  });
}

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(500).json({ message: "Admin Değilsin......" });
    }
  });
}

module.exports = { verifyUser, verifyToken, verifyAdmin };
