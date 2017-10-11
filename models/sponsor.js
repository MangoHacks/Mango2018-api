let mongoose = require('mongoose');

let sponsorSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    confirmed:{
        type:String,
        default: 'Not Confirmed'
    },
    amount:{
        type:Number
    }
});

let Sponsor = module.exports = mongoose.model('Sponsor', sponsorSchema);

module.exports.getSponsors = ((callback,limit) => {
    Sponsor.find(callback).limit(limit);
})

module.exports.addSponsor = ((sponsor, callback) => {
    Sponsor.create(sponsor, callback);
})

module.exports.updateSponsor = (name, email, options, callback) => {
	var query = {_id: id};
	var update = {
		name: user.name,
		email: user.email,
	}
	user.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeSponsor = (id, callback) => {
	var query = {_id: id};
	Sponsor.remove(query, callback);
}


module.exports.getSponsorById = (id, callback) => {
	Sponsor.findById(id, callback);
}
