const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(400).json({ error: 'Missing Authorization header' });
  }

  jwt.verify(token, process.env.jwtSecret, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

module.exports = authenticateToken;