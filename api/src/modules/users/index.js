const router = require("express").Router();
const userSchema = require("./validator");
const validator = require("../../middlewares/validator");
const { findAll, getCurrentUser, updateAvatar, createUser, createFavTrack, login, logout, sendResetPassword, resetPassword } = require("./controller");
const {authorize, isAdmin} = require("../../middlewares/auth");
const upload = require("../../middlewares/fileUpload");

router.get("/", authorize, isAdmin, findAll);
router.get("/me", authorize, getCurrentUser);
router.get("/logout", logout);
router.post('/', validator(userSchema), createUser);
router.post('/track/:idTrack', authorize, createFavTrack);
router.post("/login", login);
router.post("/updateAvatar", authorize, upload.single("avatar"), updateAvatar);
router.post("/sendResetPassword", sendResetPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;