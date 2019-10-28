const { Connection } = require('../database')
const config = require('../config')
const request = require('request')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { check, validationResult } = require('express-validator');

router.post('/login', 
  check('email').normalizeEmail().isEmail().bail(), 
  check('password').bail(), 
  (req, res, next) => {
    //get username and password
    let email = req.body.email;
    let password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() })
    }
    //hash the password
    hash = crypto.createHash('sha256')
    hash.update(password)
    let hashed_password = hash.digest('hex')
    
    // verify if it is correct
    Connection.db.collection('users').findOne({email: email, password: hashed_password}, (error, result) => {
      if(error || !result){
        res.status(401).send()
      }
      else{
        let token = jwt.sign({email: email, type: result.type},
          config.secret,
          { expiresIn: '24h'}
        )
        res.status(200).json({
          token: token,
          type: result.type
        })
      }
    })
})

router.post('/register/consumer', 
  check('email').normalizeEmail().isEmail().bail(), 
  check('password').exists(), 
  check('age').exists().isInt(), 
  check('location').exists(), 
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() })
    }
    hash = crypto.createHash('sha256')
    hash.update(req.body.password)
    let hashed_password = hash.digest('hex')
    const user = {
      type: 'consumer', 
      email: req.body.email, 
      password: hashed_password, 
      age: req.body.age, 
      gender: req.body.gender, 
      location: req.body.location
    }
    createUser(user, res)
})

router.post('/register/business', 
  check('email').normalizeEmail().isEmail().bail(), 
  check('password').exists(),
  check('name').exists(),
  check('info').exists(),
  check('location').exists().isArray(),
  check('tags').exists().isArray(),
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() })
    }
    hash = crypto.createHash('sha256')
    hash.update(req.body.password)
    let hashed_password = hash.digest('hex')
    const user = {
      type: 'business', 
      email: req.body.email, 
      password: hashed_password,
      name: req.body.name,
      info: req.body.info,
      location: req.body.location,
      tags: req.body.tags
    }
    createUser(user, res)
})

function createUser(user, res){
  Connection.db.collection('users').insertOne(user, (error, result)=>{
    if(error) res.status(400).send()
    else{
      let token = jwt.sign({email: result.email, type: result.type},
        config.secret,
        { expiresIn: '24h'}
      )
      res.json(token).status(200).send()
    }
  })  
}
module.exports = router