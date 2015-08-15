var AuthService=require('./../services/AuthService');

exports.unsuccessfulLogin = function (req, res) {
    console.info('---------------------unsuccessfulLogin--------------------------', req.session);
    res.send('unauthorised user').end();
};

exports.authenticate = function (req, res, next) {
   AuthService.authenticate();
};
exports.logout = function (req, res) {
    req.session.destroy();
    req.logout();
    console.info('---------------------successfulLogout2--------------------------', req.session);
    res.send('logout user').end();
};