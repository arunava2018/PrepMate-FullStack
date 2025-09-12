import express from "express"
import {addSubject} from "../controllers/subjectController.js"
const router = express.Router();
router.post("/addsubject", addSubject);
export default router;
