const jwt = require("jsonwebtoken");

const createTokenForUser = (user) => {
  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

function decodeToken(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ payload: decoded });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
}

module.exports = { createTokenForUser, decodeToken };
