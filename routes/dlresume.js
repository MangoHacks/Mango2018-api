let express = require('express');
let router = express.Router();

router.get("/dlresume/:_id", function (req, res) {
    // Resolve the file path etc...
    // res.render('download')
    var id = req.params._id;
    var file = './resumes/' + id;

    res.download(file); // Set disposition and send it.
});

module.exports = router;
