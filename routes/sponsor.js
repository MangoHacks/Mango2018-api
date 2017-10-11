let express = require('express');
let router = express.Router();

let Sponsor = require('../models/sponsor');

router.get('/sponsorform', ((req,res) =>{
    res.render('sponsorform')
}));

// Register User
router.post('/sponsor', function(req, res){
    let name = req.body.name;
	let email = req.body.email;
	let amount = req.body.amount;
	let confirmed = req.body.confirmed;
	
	// Validation
    req.checkBody('name', 'First Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	
	
	let errors = req.validationErrors();

	if(errors){
		res.render('sponsor',{
			errors:errors
		});
	} else {
		var newSponsor = new Sponsor({
			name: name,
			email:email,
			amount:amount,
			confirmed: confirmed
		});
		Sponsor.addSponsor(newSponsor, function(err, sponsor){
			if(err) throw err;
			console.log(sponsor);
		});
		res.redirect('/');
		
	}
});

module.exports = router;