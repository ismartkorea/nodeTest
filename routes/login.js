var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var mysql = require('mysql');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.use(methodOverride("_method"));
router.use(flash());

// MySQL Connection 초기화.
/*
var conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database : 'test',
    user: 'tester',
    password: 'test123',
    insecureAuth: true,
    multipleStatements: true
});
*/
/* GET home page. */
router.get('/', function(req, res, next) {
    var session = req.session;
    res.render('./loginForm', { title: '로그인', 'result': '', 'session' : session });
});

/**
 * 로그인 결과 처리.
 */
router.post('/process', function(req, res, next) {
    var session = req.session;
    var usrId = req.body.userId !=null ? req.body.userId : '';
    var usrPwd = req.body.userPwd !=null ? req.body.userPwd : '';

    var conn = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        database : 'test',
        user: 'tester',
        password: 'test123',
        insecureAuth: true,
        multipleStatements: true
    });

    conn.connect();
    conn.query('SELECT user_id as userId, user_pwd as userPwd, user_name as userName'
        + ' FROM user_tbl WHERE user_id = ? AND user_pwd = ?',
        [usrId, usrPwd],
        function(err, results) {
            if(err) {
                console.log('error : ', err);
                conn.rollback();
            } else {
                console.log('user : ', JSON.stringify(ss.user));


                if(usrId != results[0].userId) {
                    console.log('err userId');
                    res.render('./loginForm', {'result' : 'err1', 'session' : ss});
                } else if(usrPwd != results[0].userPwd) {
                    console.log('err userPwd');
                    res.render('./loginForm', {'result' : 'err2', 'session' : ss});
                } else {
                    console.log('OK');
                    session.userId = results[0].userId;
                    /*
                    ss.user =  {
                      'userId' : results[0].userId,
                      'userPwd' : results[0].userPwd,
                      'userName' : results[0].userName
                    };
                    */

                    res.render('./loginResult', {'session' : session});
                }

            }
        });
    conn.end();
});

router.get('/result', function(req, res, next) {
    res.render('./loginResult', { title: '로그인' });
});


router.get('/logout', function(req, res, next) {
    var session = req.session;
    if(ss.users !=null) {
        // 세션 삭제.
        req.session.destroy(function(err){
            if(err) {
                console.log(">>> destroy err: " + err);
            } else {
                req.session;
            }
        });
        res.redirect('/login');
    }

});

module.exports = router;