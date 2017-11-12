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
    year:{
        type:String,
        require:true
    },
    diet:{
        type:String,
        default:''
    },
    resume:{
        type:Object,
        default:''
    },
    size:{
        type:String,
        require:true
    },
    mlh:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    github:{
        type:String,
        require:true
    },
    firsttime:{
        type:String,
        require:true
    }
});

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
        gender:user.gender,
        year:user.year,
        github:user.github,
        firsttime:user.firsttime,
        mlh:user.mlh
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
