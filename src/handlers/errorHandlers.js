/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
// exports.notFound = (req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// };

/*
  MongoDB Validation Error Handler

  Detect if there are mongodb validation errors that we can nicely show via flash messages
*/

// exports.flashValidationErrors = (err, req, res, next) => {
//   if (!err.errors) return next(err);
//   // validation errors look like
//   const errorKeys = Object.keys(err.errors);
//   errorKeys.forEach(key => req.flash('error', err.errors[key].message));
//   res.redirect('back');
// };


/*
  Development Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  let errorStatus;

  if (err.status) {
    errorStatus = err.status;
  } else if (err.message === 'Property validation failed') {
    errorStatus  = 400;
  }
  // const errorArray = err.errors.map()
  const errorDetails = {
    errorLength: Object.keys(err.errors).length,
    error: err.errors,
    message: err.message,
    statusCode: errorStatus,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(errorStatus || 500);
  res.format({
    'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
  });
  next();
};


/*
  Production Error Handler

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
};
