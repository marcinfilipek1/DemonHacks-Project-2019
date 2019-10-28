const jwt = require('jsonwebtoken')
const config = require('./config')
//middleware function for requests that need to check if a token is valid
function verify_token(req, res, next) {
  //https://gist.github.com/narenaryan/4d03bb4ccda5bb634a3cb5c51f5e79a7/raw/08ea6e5a290f4ecc1e497d64a9d69a00201ff986/middleware.js
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send()
      } else {
        console.log(decoded)
        req.decoded = decoded
        next();
      }
    })
  } else {
      res.status(400).send()
  }
}

module.exports = verify_token