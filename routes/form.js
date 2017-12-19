let express = require('express');
let router = express.Router();
let multer = require('multer');
let upload = multer({dest:'resumes'});
let config = require('../routes/config');
var mailgun = require("mailgun-js");
var api_key = config.api_key();
var DOMAIN = config.domain();
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
const path = require('path');
var filepath = path.join(__dirname, 'mango.jpg');

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
          
      html: `<html><div class="email-bg" style="background: #6D1BBD;padding: 30px 0px 30px 0px;color: white;">
      <div class="pre-head" style="max-width: 600px;margin: 0 auto;padding: 10px 20px 10px 20px;background: #6D1BBD;font-size: 10px;color: white;">
        
      </div>
      <div class="header" style="max-width: 480px;margin: 0 auto; text-align: center">
      <img src="cid:mango.jpg" style="max-width: 50%; margin: 0 auto;">
      </div>
      <div class="email-container" style="max-width: 600px;margin: 0 auto;padding: 0px 20px 20px 20px;background: #6D1BBD;">
          <p class="greeting" style="color: white;font-size: 36px;font-weight: bold;">You registered for MangoHacks!</p>
          <p>Be on the lookout for an email confirming your spot.</p>
  
          <p>
              We're super excited to have you join us in <strong>Miami, FL</strong> <strong>Feb 2nd - 4th</strong> for a sweet weekend.
          </p>
          <p>
              We will be sending a bus to North Florida, stopping at FSU, UF, and UCF. We'll release details about reserving you a spot on social media 
              and through email in the coming days.
          </p>
        
  
          <p>
              For next steps, just sit tight and we'll be sending out rolling acceptances.
          </p>
          
          <p>
              If you still have any questions, hit us up at <a href="mailto:team@mangohacks.com" style="color: #E53A4B;">team@mangohacks.com</a> and follow us on <a href="https://www.facebook.com/MangoHacks" style="color: #E53A4B;">Facebook</a>, <a style="color: #E53A4B;" href="https://www.instagram.com/fiumangohacks/">Instagram</a> and <a href="https://twitter.com/fiumangohacks" style="color: #E53A4B;">Twitter</a>.
          </p>
  
          <p>&lt;3</p>
          <p>The MangoHacks Team</p>
  
          <div class="footer" style="background-color: #6D1BBD;margin-top: 10px;color: white;padding: 5px;font-size: 11px;">
              <p>
                  &copy; 2017-2018 MangoHacks
              </p>
          </div>
      </div>
  </div></html>`,
  inline: filepath


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
        res.redirect('https://mangohacks.com/');  
    }
});

module.exports = router;