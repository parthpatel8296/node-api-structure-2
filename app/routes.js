// Main application routes
module.exports = (app) => {
    app.use('/api/users', require('./api/user'));
};