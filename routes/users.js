const mongoose = require('mongoose');
const cryptoRandomString = require('crypto-random-string');
const sendMessage = require('../modules/sendsms');
const bcrypt = require('bcrypt');
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
  verifyNumber:{type:String,require:true},
  expire_at: {type: Date, default: Date.now, expires: 200}
});
const userTokenModel = mongoose.model('userToken', userTokenSchema);

router.get('/',(req,res) =>{
  res.render('register')
});

/* GET users listing. */
router.all('/register', function(req, res, next) {
  const token = cryptoRandomString({length: 24, type: 'url-safe'});
  const phoneNumber = req.body.phone;
  const salt = bcrypt.genSaltSync(10);
  const verifyNumber = cryptoRandomString({length:5,type:'numeric'});
  const hash = bcrypt.hashSync(verifyNumber, salt);
  const userToken = new userTokenModel({ token: token, phone: phoneNumber,verifyNumber:hash });
  userToken.save();
  res.status(200).render('valid',{token:token});
  console.log(userToken)
  const message = `کد فعال سازی شما: ${verifyNumber}`
  sendMessage(phoneNumber.toString(),message)


});

router.post('/validate',(req,res) => {
  userTokenModel.findOne({ token: req.query.token }, function (err, doc) {
    console.log(`sent num is ${req.body.validnum}`);
    console.log(`doc is ${doc}`);
    const result = bcrypt.compareSync(req.body.validnum, doc.verifyNumber);
    if(result){
      const removeItem = userTokenModel.remove({ token: req.query.token });
      console.log(removeItem.deletedCount); // Number of documents removed
      res.status(200).send("ok you register succesfully");
    } else{
      res.status(401).render('valid',{token:req.query.token});
    }
  });

});

module.exports = router;
