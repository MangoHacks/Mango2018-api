let express = require('express');
let router = express.Router();

router.get("/download", function (req, res) {
    // Resolve the file path etc...
    // res.render('download')
    var file = './resumes/' ;
res.download(file); // Set disposition and send it.
});

module.exports = router;
