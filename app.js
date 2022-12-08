// required modules
const express = require('express');
const httpError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const port = require('./config').port

// setting up express app
const app = express();
app.set('port', port);

// setting up middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setting up routes
app.use('/v1', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(httpError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
});

// running the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
