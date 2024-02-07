import Comment from "../models/comment.js"

export const createComment = async (comment) => {
    try {
        return await Comment.create(comment);
    } catch (error) {
        console.log(`Error in creating comment \n${error}`);
        throw error
    }
}

export const findCommentsByReviewId = async (reviewId) => {
    try {
        return await Comment.find({reviewId:reviewId});
    } catch (error) {
        console.error(`Error in fetching comments \n${error}`);
        throw error;
    }
}

export const findCommentById = async (commentId) => {
    try {
        return await Comment.findById(commentId);
    } catch (error) {
        console.error(`Error in fetching the Comment\n${error}`);
        throw error;
    }
}

export const deleteCommentById = async (commentId) => {
    try {
        return await  Comment.findByIdAndDelete(commentId);
    } catch (error) {
        console.error(`Error in deleting the Comment\n${error}`);
        throw error;
    }
}