import express from "express";
import {
    addUser,
    updateUser,
    getUser,
    getUserAll,
    deleteUser
} from "../controller/user-controllers.js";

const router = express.Router();

router.post("/client",addUser);
router.get("/client",getUserAll);
router.put("/client-update/:id",updateUser);
router.get("/client/:id",getUser);
router.delete("/client/:id",deleteUser);

export default router;