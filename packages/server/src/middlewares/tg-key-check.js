const tgKeyCheck = (req, res, next) => {
  const secretKey = req.headers['x-secret-key'];

  if (!secretKey || secretKey !== process.env.TG_SECRET_KEY) {
    return res.status(403).send();
  }

  next();
};

module.exports = tgKeyCheck;
