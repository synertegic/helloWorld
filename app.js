var express = require('express'),
    http = require('http'),
    path = require('path')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Main catchall route
app.all('*', function(req, res) {
    var nano = require('nano')('http://fea:Private39!@localhost:5984');
    var alice = nano.use('alice');
    alice.get('transaction', function(err, body) {
        if (!err)
            console.log(body);
        var tId = body.tranid;
        var tFirst = body.first;
        var tLast = body.last;
        var tRev = body._rev;
        var theData = { pageData: {name : [tId,tFirst,tLast,tRev]},
                        pageData2: {name : [tId,tFirst,tLast,tRev]}
        }
        res.render('index', theData);
    });
});

http
    .createServer(app)
    .listen(
        app.get('port'),
        function(){
            console.log(
                'Express server listening on port ' +
                app.get('port')
            );
        }
    );
