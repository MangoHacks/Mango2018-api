let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    major:{
        type:String,
    },
    diet:{
        type:String,
    },
    gender:{
        type:String,
    },
});

let User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsers = ((callback,limit) => {
    User.find(callback).limit(limit);
})

module.exports.addUser = ((user, callback) => {
    User.create(user, callback);
})

