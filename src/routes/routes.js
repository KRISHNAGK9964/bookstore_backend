import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { getBookById, getBooks } from "../controllers/books.controller.js";
import { addReview, deleteReview, editReview, getReviewsByBook } from "../controllers/reviews.controller.js";
import { addComment, deleteComment, editComment, getCommentsByReview } from "../controllers/comments.controller.js";
const router = express.Router();


// Public routes
router.post('/signup',signup);
router.post('/login',login);
router.get("/books",getBooks);
router.get("/books/:id",getBookById);

// // Protected routes
router.use(authMiddleware);

router.get("/reviews/:bookId",getReviewsByBook);
router.post("/reviews/:bookId",addReview);
router.patch("/reviews/:reviewId",editReview);
router.delete("/reviews/:reviewId",deleteReview);

router.get("/comments/:reviewId",getCommentsByReview);
router.post("/comments/:reviewId",addComment);
router.patch("/comments/:commentId",editComment);
router.delete("/comments/:commentId",deleteComment);

export default router;