let express = require('express');
let router = express.Router();
let multer = require('multer');
let upload = multer({dest:'resumes'});
var mailgun = require("mailgun-js");
var api_key = '';
var DOMAIN = 'hi.mangohacks.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

let User = require('../models/user');



router.get('/form', ((req,res) =>{
    res.render('form')
}));

// Register User
router.post('/form', upload.single('resume'),function(req, res){
    let name = req.body.name;
    let email = req.body.email;
    let school = req.body.school;
    let major = req.body.major;
    let year = req.body.year;
    let diet = req.body.diet;
    let firsttime = req.body.firsttime;
    let gender = req.body.gender;
    let size = req.body.size;
    let github = req.body.github;
    let resume= req.file;
    let mlh = req.body.mlh;
    let checkin = req.body.checkin;
    var data = {
        from: 'Team MangoHacks <team@mangohacks.com>',
        to: email.toString(),
        subject: 'Slam Dunk! You are now registered for MangoHacks!',
        text: 'Thanks for registering for MangoHacks',
        html: '<html> </html>'
      };


    // Validation
//     req.checkBody('name', 'First Name is required').notEmpty();
//     req.checkBody('email', 'Email is required').notEmpty();
//     req.checkBody('email', 'Email is not valid').isEmail();
//     req.checkBody('school', 'School is required').notEmpty();
//     req.checkBody('school', 'School is required').notEmpty();
//     req.checkBody('major', 'Major is required').notEmpty();
//     req.checkBody('size', 'Shirt Size is required').notEmpty();
//     req.checkBody('year', 'School Year is required').notEmpty();
//     req.checkBody('firsttime', 'Is it your first time? is required').notEmpty();
//     req.checkBody('mlh', 'You need to agree to MLH Code of conduct').notEmpty();
    
    let errors = req.validationErrors();

    if(errors){
        res.render('form',{
            errors:errors
        });
    } else {
        var newUser = new User({
            name: name,
            email:email,
            school:school,
            major:major,
            year:year,
            firsttime:firsttime,
            gender:gender,
            size:size,
            github:github,
            resume:resume,
            diet:diet,
            mlh:mlh,
            checkin:checkin
        });
        User.addUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        mailgun.messages().send(data, function (error, body) {
            if(error) throw error;
            console.log(body);
        });
        res.redirect('/');  
    }
});

module.exports = router;