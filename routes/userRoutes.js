const { Router } = require("express");
const {
  registerHandler,
  loginHandler,
  handlerGetAllUsers,
  handlerUpdateUser,
  handlerDeleteUser,
} = require("../Controllers/userControllers");
const { decodeToken } = require("../services/jwt");

const router = Router();

router.get("/decode-token", decodeToken);

router.get("/all", handlerGetAllUsers);

router.post("/register", registerHandler);

router.post("/login", loginHandler);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
});

router.route("/update/:id").put(handlerUpdateUser).delete(handlerDeleteUser);

module.exports = router;
