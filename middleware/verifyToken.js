const jwt = require('jsonwebtoken');  // Assuming you're using JWT for authentication

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');  // Token is expected in the header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with secret key
    req.user = verified;  // Attach the verified user info to the request object
    next();  // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
