import  express  from "express";
import { postController } from "./post.controller";


const router = express.Router();

router.get('/', postController.getAllPostController)
router.get('/learn-query', postController.learnAggregateAndGrouping)
router.get('/:id', postController.getSinglePostController)
router.post('/create-post', postController.createPostController)
router.patch('/:id', postController.updatePostController)
router.delete('/:id', postController.deletePostController)


export const postRoutes = router;