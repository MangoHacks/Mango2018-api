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
	let gender = req.body.gender;
	let year = req.body.year;
	let firsttime = req.body.firsttime;
	let mlh = req.body.mlh;
	let github = req.body.github;
	
	// Validation
    req.checkBody('name', 'First Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('major', 'Major is required').notEmpty();
	req.checkBody('size', 'Shirt Size is required').notEmpty();
	req.checkBody('school', 'School is required').notEmpty();
	req.checkBody('school', 'School is required').notEmpty();
	req.checkBody('year', 'School Year is required').notEmpty();
	req.checkBody('firsttime', 'Is it your first time? is required').notEmpty();
	req.checkBody('mlh', 'You need to agree to MLH Code of conduct').notEmpty();
	
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
			school:school,
			gender:gender,
			mlh:mlh,
			firsttime:firsttime,
			year:year,
			github:github
		});
		User.addUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
		res.redirect('/');	
	}
});

module.exports = router;