let express = require('express');
let router = express.Router();

let User = require('../models/user.js')
let Sponsor = require('../models/sponsor.js')


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


router.get('/sponsors', (req, res) => {
	Sponsor.getSponsors((err, sponsors) => {
		if(err){
			throw err;
        }
        res.json(sponsors);
    });
});
router.delete('/sponsors/:_id', (req, res) => {
	var id = req.params._id;
	Sponsor.removeSponsor(id, (err, sponsor) => {
		if(err){
			throw err;
		}
		res.json(sponsor);
	});
});
router.get('/sponsors/:_id', (req, res) => {
	Sponsor.getSponsorById(req.params._id, (err, sponsor) => {
		if(err){
			throw err;
		}
		res.json(sponsor);
	});
});


router.put('/sponsors/:_id', (req, res) => {
	var id = req.params._id;
	var sponsor = req.body;
	Sponsor.updateSponsor(id, sponsor, {}, (err, sponsor) => {
		if(err){
			throw err;
		}
		res.json(sponsor);
	});
});

module.exports = router;
