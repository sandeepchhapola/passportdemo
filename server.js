var express = require('express')
    , passport = require('passport')
    , LocalStrategy = require('passport-local')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , routes = require('./routes')
    , app = express()
    , server = require('http').createServer(app)
    , PORT = 3000;

var user = {
    name: 'Abhishek',
    password: 'Abhi@123',
    email: 'Abhishek@gmail.com'
};
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username === user.name && password === user.password) {
            return done(null, {name: user.name, email: user.email});
        } else {
            return done(null, false);
        }
        /*
         User.findOne({ username: username }, function (err, user) {
         if (err) { return done(err); }
         if (!user) { return done(null, false); }
         if (!user.verifyPassword(password)) { return done(null, false); }
         return done(null, user);
         });
         */
    }
));

passport.serializeUser(function (user, done) {
    console.info('---------------serializeUser-------------', user);
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.info('---------------deserializeUser-------------', user);
    done(null, user);
    /*User.findById(id, function (err, user) {
     done(err, user);
     });*/
});

app.use(passport.initialize());
app.use(passport.session());

routes.init(app);

server.listen(PORT);

function stopWebServer() {
    server.close(function () {
        console.info('Webserver shutdown');
        process.exit();
    });
}

var gracefulShutdown = function () {
    console.info("Received kill signal, shutting down Webserver gracefully.");
    stopWebServer();
    // if after
    setTimeout(function () {
        console.error("Could not close connections in time, forcefully shutting down webserver");
        process.exit();
    }, 10 * 1000);
};

// Ctrl + C
process.on('SIGINT', gracefulShutdown);

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

process.on('uncaughtException', function (err) {
    console.error("Uncaught Exception: " + err);
    process.exit(1);
});

console.info('Express server listening on port: %s', PORT);
