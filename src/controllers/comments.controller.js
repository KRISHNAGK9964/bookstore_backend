import mongoose from "mongoose";
import { findReviewById } from "../services/review.service.js";
import { createComment, deleteCommentById, findCommentById, findCommentsByReviewId } from "../services/comments.service.js";

export const addComment = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const reviewId = req.params.reviewId;
    console.log(userId, text, reviewId);
    if (!reviewId || !text) {
      return res.status(405).json({ message: "Required fields are missing" });
    }
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(404)
        .json({ message: "Review not found/Wrong review id" });
    }
    const review = await findReviewById(reviewId);
    if (!review) {
      return res.status(405).json({ message: "Review doesn't Exist" });
    }

    const commentObject = {
      reviewId,
      userId,
      text,
    };
    const comment = await createComment(commentObject);
    return res
      .status(201)
      .json({ message: "comment added successfully", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getCommentsByReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    console.log(reviewId);
    if (!reviewId) {
      return res.status(405).json({ message: "Required fields are missing" });
    }
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(404)
        .json({ message: "Review not found/Wrong review id" });
    }
    const review = await findReviewById(reviewId);
    if (!review) {
      return res.status(405).json({ message: "Review doesn't Exist" });
    }
    const comments = await findCommentsByReviewId(reviewId);
    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { userId, text} = req.body;
    const commentId = req.params.commentId;
    console.log(text, commentId);
    if (!commentId || !text) {
      return res.status(405).json({ message: "Required fields are missing" });
    }
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res
        .status(404)
        .json({ message: "comment not found/Wrong comment id" });
    }
    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    if (comment.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this comment" });
    }

    comment.text = text;
    const updatedComment = await comment.save();
    return res
      .status(201)
      .json({ message: "comment updated successfully", updatedComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { userId } = req.body;
    const commentId = req.params.commentId;
    console.log(commentId);

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return res
        .status(404)
        .json({ message: "comment not found/Wrong comment id" });
    }
    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    if (comment.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this comment" });
    }

    const deletedComment = await deleteCommentById(commentId);

    return res
      .status(200)
      .json({ message: "comment deleted successfully", deletedComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
