var UserController = require('./controlers/UserController')
    , AuthController = require('./controlers/AuthController');

exports.init = function (app) {
    app.get('/login', AuthController.unsuccessfulLogin);
    app.get('/logout', AuthController.logout);
    app.post('/login', AuthController.authenticate);
    app.get('/users', UserController.getAllUsers);
    app.post('/users', UserController.createNewUser);
//    app.post('/users/:name', UserController.createNewUser);
};
