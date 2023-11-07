const router = require("express").Router();

const userCntrlr = require("../controllers/userCntrlr");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const authSuperAdmin = require("../middleware/authSuperAdmin");

router.post("/register", userCntrlr.register);

router.post("/login", userCntrlr.login);

router.get("/logout", userCntrlr.logout);

router.get("/refresh_token", userCntrlr.refreshToken);

router.get("/infor", auth, userCntrlr.getUser);

router.patch("/addcart", auth, userCntrlr.addCart);

router.get("/history", auth, userCntrlr.history);

router.get("/notification", userCntrlr.notification);

router.get("/all-users", auth, authAdmin, userCntrlr.getUsers);

router.get("/admins", auth, authAdmin, userCntrlr.getAdmins);

router.delete("/userdelete/:id", auth, authAdmin, userCntrlr.deleteUser)

router.route("/superadmin/:id")
        .put(userCntrlr.createAdmin)

router.route("/admindelete/:id")
        .put(userCntrlr.deleteAdmin)

module.exports = router;
