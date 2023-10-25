function success(res, data, message = "Success", status = 200) {
  res.status(status).json({
    status,
    success: true,
    message,
    data,
  });
}

function created(res, data, message = "Resource created", status = 201) {
  res.status(status).json({
    status,
    success: true,
    message,
    data,
  });
}

function badRequest(res, message = "Bad request", status = 400) {
  res.status(status).json({
    status,
    success: false,
    message: message,
  });
}

function unauthorized(res, message = "Unauthorized", status = 401) {
  res.status(status).json({
    status,
    success: false,
    message: message,
  });
}

function forbidden(res, message = "Forbidden", status = 403) {
  res.status(status).json({
    status,
    success: false,
    message: message,
  });
}

function notFound(res, message = "Resource not found", status = 404) {
  res.status(status).json({
    status,
    success: false,
    message: message,
  });
}

function conflict(res, message = "Conflict", status = 409) {
  res.status(status).json({
    status,
    success: false,
    message: message,
  });
}

function serverError(res, message = "Internal server error", status = 500) {
  res.status(status).json({
    status,
    success: false,
    message: message,
  });
}

module.exports = {
  success,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  serverError,
};
