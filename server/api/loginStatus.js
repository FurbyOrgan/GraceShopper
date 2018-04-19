function isLoggedIn(req, res, next) {
    if (req.user.id === req.params.id){
        return next()
    }
    else {
        res.sendStatus(400)
        res.redirect('/')
    }
}


function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin){
        return next();
    }
    else {
        res.sendStatus(400)
        throw new Error('Not an admin')
    }
}


function isSelfOrAdmin(req, res, next) {
    if (req.params.id == req.user.id || req.user.isAdmin){
        return next();
    }
    else {
        res.sendStatus(400)
        res.redirect('/')
    }
}

module.exports = {
    isLoggedIn,
    isAdmin,
    isSelfOrAdmin
}
