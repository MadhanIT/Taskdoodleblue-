const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountsSchema = new Schema({
    UserName : {
        type:String,
    },
    Email : {
        type:String,
    },
    MobileNumber : {
        type:String,
    },
    CompanyName : {
        type:String,
    },
    CreatedAt:{
        type : Date,
        default : Date.now
    },
    UpdatedAt : {
        type : Date,
    },
    active : {
        type : Boolean
    }
});

module.exports = Accounts = mongoose.model('accounts',accountsSchema);