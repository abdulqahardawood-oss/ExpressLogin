export const validateUser = (req, res, next) => {
  const {
    firstName,
    secondName,
    email,
    phoneNumber,
  } = req.body;

  if (!firstName) {
    return res.status(400).json({
      message: "First name is required",
    });
  }

  if (!secondName) {
    return res.status(400).json({
      message: "Second name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!phoneNumber) {
    return res.status(400).json({
      message: "Phone number is required",
    });
  }

  next();
};