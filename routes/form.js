let express = require('express');
let router = express.Router();

let User = require('../models/user');

router.get('/form', ((req,res) =>{
    res.render('form')
}));

// Register User
router.post('/form', function(req, res){
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
	let email = req.body.email;
	let major = req.body.major;
	let diet = req.body.diet;
	let gender = req.body.gender;

	// Validation
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();

	let errors = req.validationErrors();

	if(errors){
		res.render('form',{
			errors:errors
		});
	} else {
		var newUser = new User({
			firstName: firstName,
			lastName: lastName,
			email:email,
			major:major,
			diet:diet,
			gender:gender,
		});

		User.addUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
		
		res.redirect('/');
	
	}
});

module.exports = router;