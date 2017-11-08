let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    major:{
        type:String,
        require:true
    },
    school:{
        type:String,
        require:true
    },
    diet:{
        type:String,
        default:''
    },
    resume:{
        type:String,
        default:''
    },
    size:{
        type:String,
        require:true
    },
    mlh:{
        type:String,
        require:true
    }
});


// SIGNUP 
// name
// email
// gender
// school
// year
// resume
// github
// first time?
// MLH CODE OF CONDUCT

let User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsers = ((callback,limit) => {
    User.find(callback).limit(limit);
})

module.exports.addUser = ((user, callback) => {
    User.create(user, callback);
})

module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	var update = {
		name: user.name,
		email: user.email,
		major: user.major,
		size: user.size,
		resume: user.resume,
        diet: user.diet,
        school:user.school,
     
        
	}
	User.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}


module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}
