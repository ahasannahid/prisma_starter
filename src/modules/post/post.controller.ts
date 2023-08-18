import { Request, Response } from "express";
import { postService } from "./post.service";


const createPostController = async(req: Request, res: Response) => {
    try{
        const result = await postService.createPost(req.body);
        res.send({
            success: true,
            message: 'Post created successfully!',
            data: result
        })
    }
    catch(err){
        res.send(err);
    }
}


const getAllPostController = async(req: Request, res: Response) => {
    try{
        const result = await postService.getAllPost();
        res.send({
            success: true,
            message: 'post fetched successfully!',
            data: result
        })
    }
    catch(err){
        res.send(err);
    }
}


export const postController = {
    createPostController,
    getAllPostController
}