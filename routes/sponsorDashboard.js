let express = require('express');
let router = express.Router();

let User = require('../models/user.js')

router.get ('/', ((req,res) => {
    res.render('sponsordashboard');
}));

router.get('/users', (req, res) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

module.exports = router;