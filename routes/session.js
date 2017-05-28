var express = require('express');
var router = express.Router();

router.get('/session', function (req, res, next) {
    var session = req.session;
    console.log(session.user);
    if (session.user) {
        res.status(200).send('session already saved. user = ' + session.user);
    } else {
        session.user = 'test';
        res.status(200).send('session saved');
    }
});

module.exports = router;
