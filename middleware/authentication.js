const CustomeError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomeError.UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
  } catch (error) {
    throw new CustomeError.UnauthenticatedError("Authentication Invalid");
  }
  next();
};

const authorizePermisions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomeError.UnauthorizedError(
        "Unauthorized to access resource "
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermisions,
};
