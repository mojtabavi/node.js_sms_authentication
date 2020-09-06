const _ = require('lodash');

function phoneNormalize(phoneNumber){
    phoneNumber = phoneNumber.toString() // convert phonenumber to string
    const from_char = "۱۲۳۴۵۶۷۸۹۰";
    const to_char = "1234567890";
    for(var i=0;i<from_char.length;i++){
        phoneNumber = phoneNumber.replace(from_char[i],to_char[i]);
    }
    phoneNumber = _.trim(phoneNumber);
    return phoneNumber;
}

module.exports = phoneNormalize;