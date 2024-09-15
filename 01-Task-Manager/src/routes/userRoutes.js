const router = require("express").Router();
const { getUser, registerUser, loginUser } = require("../controllers/users");

router.route("/user").get(getUser);
router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);

module.exports = router;
