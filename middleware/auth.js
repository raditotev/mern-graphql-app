const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isValid = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isValid = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'application-private-key');
  } catch (error) {
    req.isValid = false;
    return next();
  }

  if (!decodedToken) {
    req.isValid = false;
    return next();
  }

  req.isValid = true;
  req.userId = decodedToken.userId;
  next();
};
