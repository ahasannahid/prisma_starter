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
    console.log(req.query);
    const option = req.query;
    try{
        const result = await postService.getAllPost(option);
        res.send({
            success: true,
            message: 'post fetched successfully!',
            total: result.total,
            data: result.data
        })
    }
    catch(err){
        res.send(err);
    }
}

const getSinglePostController = async (req: Request, res: Response) => {
    try {
        const result =await postService.getSinglePost(parseInt(req.params.id));
        res.send({
            success: true,
            message: "Single post fetched successfully",
            data: result
        })
    }
    catch(err){
        res.send(err)
    }
}



const updatePostController = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    try{
        const result = await postService.updatePost(id,data);
        res.send({
            success: true,
            message: 'post updated successfully!',
            data: result
        })
    }
    catch(err){
        res.send(err);
    }
}

const deletePostController = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try{
        const result = await postService.deletePost(id);
        res.send({
            success: true,
            message: 'post deleted successfully!',
            data: result
        })
    }
    catch(err){
        res.send(err);
    }
}



export const postController = {
    createPostController,
    getAllPostController,
    getSinglePostController,
    updatePostController,
    deletePostController
}