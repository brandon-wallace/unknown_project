module.exports = {
    checkNotAuthenticated: function(request, response, next) {
        if (request.isAuthenticated()) {
            return response.redirect('/profile');
        }
        next();
    }
}
