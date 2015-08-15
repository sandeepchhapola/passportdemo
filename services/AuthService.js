var passport = require('passport');

exports.authenticate = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.session.user = user;
            console.info('---------------------successfulLogin--------------------------', req.session);
            return res.send('Welcome user').end();
        });
    })(req, res, next);
};
exports.logout = function (req, res) {
    req.session.destroy();
    req.logout();
    console.info('---------------------successfulLogout2--------------------------', req.session);
    res.send('logout user').end();
};