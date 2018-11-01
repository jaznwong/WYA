/**
 * Simple error handler
 * @returns - the error message specified in next(error.message) and next(error.status)
 */
function errorHandler(error, request, response, next) {
  console.error(error)
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong."
    }
  });
}

module.exports = errorHandler;
