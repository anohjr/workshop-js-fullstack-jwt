const router = require("express").Router();
const userSchema = require("./validator");
const validator = require("../../middlewares/validator");
const { findAll, createUser, createFavTrack, login } = require("./controller");
const {authorize, isAdmin} = require("../../middlewares/auth");

router.get("/", authorize, isAdmin, findAll);
router.post('/', validator(userSchema), createUser);
router.post('/track/:idTrack', authorize, createFavTrack);
router.post("/login", login);

module.exports = router;