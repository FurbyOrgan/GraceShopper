function isLoggedIn(req, res, next) {
    if (req.user) {return next();}
    res.redirect('/')
}


function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin){
        return next();
    }
    else {
        throw new Error('Not an admin')
    }
}


function isSelfOrAdmin(req, res, next) {
    if (req.params.id == req.user.id || req.user.isAdmin) {return next();}
    res.redirect('/')
}

module.exports = {
    isLoggedIn,
    isAdmin,
    isSelfOrAdmin
}
