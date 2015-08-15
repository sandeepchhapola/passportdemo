var UserService=require('./../services/UserService');
exports.createNewUser = function (req, res) {
    UserService.createNewUser(req.body,function(){
        res.send('user added successfully').end();
    });
};

exports.getAllUsers = function (req, res) {
    if(!req.session.user){
        res.send('you are not logged in').end();
        return;
    }
    res.send('all users found successfully').end();
};