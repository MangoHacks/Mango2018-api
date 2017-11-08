let express = require('express');
let router = express.Router();

let User = require('../models/user');

router.get('/form', ((req,res) =>{
    res.render('form')
}));

// Register User
router.post('/form', function(req, res){
    let name = req.body.name;
	let email = req.body.email;
	let major = req.body.major;
	let diet = req.body.diet;
	let size = req.body.size;
	let resume= req.body.resume;
	let school = req.body.school;
	
	// Validation
    req.checkBody('name', 'First Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('major', 'Major is required').notEmpty();
	req.checkBody('major', 'Major is required').notEmpty();
	
	let errors = req.validationErrors();

	if(errors){
		res.render('form',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			major:major,
			size:size,
			resume:resume,
			diet:diet,
			school:school
		});
		User.addUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
		res.redirect('/');
		
	}
});

module.exports = router;