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
        type:Number,
        default: 0
    }
});

let Sponsor = module.exports = mongoose.model('Sponsor', sponsorSchema);

module.exports.getSponsors = ((callback,limit) => {
    Sponsor.find(callback).limit(limit);
})

module.exports.addSponsor = ((sponsor, callback) => {
    Sponsor.create(sponsor, callback);
})

module.exports.updateSponsor = (id,sponsor, options, callback) => {
	var query = {_id: id};
	var update = {
		// name: sponsor.name,
        // email: sponsor.email,
        // amount: sponsor.amount,
        confirmed: sponsor.confirmed
	}
	Sponsor.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeSponsor = (id, callback) => {
	var query = {_id: id};
	Sponsor.remove(query, callback);
}


module.exports.getSponsorById = (id, callback) => {
	Sponsor.findById(id, callback);
}
