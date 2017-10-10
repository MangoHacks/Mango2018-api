let express = require('express');
let router = express.Router();

let User = require('../models/user.js')

router.get ('/', ((req,res) => {
    res.render('index');
}));

router.get('/users', (req, res) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
        }
        res.json(users);
    });
});
router.delete('/users/:_id', (req, res) => {
	var id = req.params._id;
	User.removeUser(id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});
router.get('/users/:_id', (req, res) => {
	User.getUserById(req.params._id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});
module.exports = router;