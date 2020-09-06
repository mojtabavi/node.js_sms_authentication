const mongoose = require('mongoose');
const cryptoRandomString = require('crypto-random-string');
const sendMessage = require('../modules/sendsms');
const express = require('express');
const router = express.Router();


const userTokenSchema = new mongoose.Schema({
  token: {
    require:true,
    type: String,
  },
  phone: {
    require: true,
    type: Number,
  },
  verifyNumber:{type:Number,require:true},
  expire_at: {type: Date, default: Date.now, expires: 300}
});
const userTokenModel = mongoose.model('userToken', userTokenSchema);

router.get('/',(req,res) =>{
  res.render('register')
});

/* GET users listing. */
router.all('/register', function(req, res, next) {
  const token = cryptoRandomString({length: 24, type: 'url-safe'});
  const phoneNumber = req.body.phone;
  const verifyNumber = cryptoRandomString({length:5,type:'numeric'});
  const userToken = new userTokenModel({ token: token, phone: phoneNumber,verifyNumber:verifyNumber });
  userToken.save();
  res.status(200).render('register');
  console.log(userToken)
  const message = `کد فعال سازی شما: ${verifyNumber}`
  sendMessage(phoneNumber.toString(),message)


});

module.exports = router;
