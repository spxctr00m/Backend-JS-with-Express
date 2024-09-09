const router = require("express").Router();
const { getUsers, registerUser, loginUser } = require("../controllers/users");

router.route("/users").get(getUsers);
router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);

module.exports = router;
