module.exports = {
    ensureAuthenticated: function(request, response, next) {
        if (request.isAuthenticated()) {
            return next()
        }
        request.flash('error', 'Please login to view this page.');
        response.redirect('/users/login');
    }
}
