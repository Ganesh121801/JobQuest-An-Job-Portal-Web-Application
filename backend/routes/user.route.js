import express from "express" 
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
import  {singleupload} from "../middlewares/multer.js"

router.route("/register").post( singleupload , register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleupload ,updateProfile);

export default router;