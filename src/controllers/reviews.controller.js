import mongoose from "mongoose";
import { getBookByVolumeId } from "../services/books.service.js";
import {
  createReview,
  deleteReviewById,
  findReviewById,
  findReviewsByBookId,
} from "../services/review.service.js";

export const addReview = async (req, res) => {
  try {
    const { userId, text, rating } = req.body;
    const bookId = req.params.bookId;
    console.log(userId, text, rating, bookId);
    if (!bookId || !text || !rating) {
      return res.status(405).json({ message: "Required fields are missing" });
    }
    const bookExist = await getBookByVolumeId(bookId);
    if (!bookExist) {
      return res.status(405).json({ message: "Book doesn't Exist" });
    }
    // const userId = verifyAccessToken(req.cookies.accesstoken)
    const reviewObject = {
      bookId,
      userId,
      text,
      rating,
    };
    const review = await createReview(reviewObject);
    return res
      .status(201)
      .json({ message: "review added successfully", review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getReviewsByBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    console.log(bookId);
    const bookExist = await getBookByVolumeId(bookId);
    if (!bookExist) {
      return res.status(405).json({ message: "Book doesn't Exist" });
    }
    const reviews = await findReviewsByBookId(bookId);
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const { userId, text, rating } = req.body;
    const reviewId = req.params.reviewId;
    console.log(text, rating, reviewId);
    if (!reviewId || !text || !rating) {
      return res.status(405).json({ message: "Required fields are missing" });
    }
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(404)
        .json({ message: "Review not found/Wrong review id" });
    }
    const review = await findReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this review" });
    }

    review.text = text;
    review.rating = rating;
    const updatedReview = await review.save();
    return res
      .status(201)
      .json({ message: "review updated successfully", updatedReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { userId } = req.body;
    const reviewId = req.params.reviewId;
    console.log(reviewId);

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(404)
        .json({ message: "Review not found/Wrong review id" });
    }
    const review = await findReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this review" });
    }

    const deletedReview = await deleteReviewById(reviewId);

    return res
      .status(200)
      .json({ message: "review deleted successfully", deletedReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
