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

/*
connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
        if (error) {
            return connection.rollback(function() {
                throw error;
            });
        }

        var log = 'Post ' + results.insertId + ' added';

        connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
            if (error) {
                return connection.rollback(function() {
                    throw error;
                });
            }
            connection.commit(function(err) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('success!');
            });
        });
    });
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('call test index');
    res.render('./test/index', { title: 'Express' });
});

/**
 *
 */
router.get('/sql', function(req, res, next) {
    var ss = req.session;
    console.log('call sql');

    var conn = mysql.createConnection(
        {
            host: 'localhost',
            port: 3306,
            database : 'test',
            user: 'tester',
            password: 'test123',
            insecureAuth: true,
            multipleStatements: true,
            debug: ['ComQueryPacket', 'RowDataPacket']
        }
    );

    conn.query('INSERT INTO user_tbl (user_id, user_pwd, user_name)'
        + 'VALUES (?, ?, ?)',
        ['akira', '123'],
        function(err) {
            if(err) {
                console.log('error code : ', err.code);
                console.log('err fatal : ' , err.fatal);
                console.log('error sql : ', err.sql);
                console.log('error sqlMessage : ', err.sqlMessage);
            } else {

                res.status(200).send('SQL OK');
            }
        }
    );

    conn.end();
});


module.exports = router;