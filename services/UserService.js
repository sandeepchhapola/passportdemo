exports.createNewUser = function (user,callback) {
callback(err,done)
};

exports.getAllUsers = function (req, res) {
    if(!req.session.user){
        res.send('you are not logged in').end();
        return;
    }
    res.send('all users found successfully').end();
};