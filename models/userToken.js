const mongoose = require('mongoose');

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

module.exports = userTokenModel;