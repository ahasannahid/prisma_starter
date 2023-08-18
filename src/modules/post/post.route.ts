import  express  from "express";
import { postController } from "./post.controller";


const router = express.Router();

router.post('/create-post', postController.createPostController)
router.get('/', postController.getAllPostController)

export const postRoutes = router;