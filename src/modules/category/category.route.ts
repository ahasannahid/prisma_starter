import  express  from "express";
import { categoryContoller } from "./category.controller";

const router = express.Router();

router.post('/create-category', categoryContoller.insertIntoDB)

export const categoryRoutes = router;