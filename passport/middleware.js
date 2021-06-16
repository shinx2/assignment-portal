
const isUserAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.send({message: "Unauthorised! You have not logged in"})
    }
}

module.exports = isUserAuthenticated;