const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const registerValidation = require('../validation/register');
const loginValidation = require('../validation/login');
const jwtSecret = require('../config/index').jwtSecret;
router.post('/register', async (req, res) => {
  const { errors, isValid } = registerValidation(req.body);
  if (isValid > 0)
    return res.status(400).json(errors);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = 'User already exist!';
      return res.status(400).json(errors);
    }
    const { email, password } = req.body,
      avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    const name = 'anonymous';
    const userInfo = { name, email, avatar, password };
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(password, salt);
    const newUser = await User.create(userInfo);
    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post('/login', async (req, res) => {
  const { errors, isValid } = loginValidation(req.body);
  if (isValid > 0) {
    console.log('login', isValid, errors);
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'User not found!'
    return res.status(404).json(errors);
  }
  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  }
  const { id, name, email: userEmail, avatar } = user;
  const token = await jwt.sign({ id, name, userEmail, avatar }, jwtSecret, { expiresIn: 3600 });
  const bearerToken = `Bearer ${token}`;
  res.json({ token: bearerToken });
});
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).send(req.user);
});
module.exports = router;