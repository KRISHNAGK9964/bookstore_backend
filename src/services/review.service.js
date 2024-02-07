import Review from "../models/review.js"


export const createReview = async (review)=>{
    try {
        return await Review.create(review);
    } catch (error) {
        console.log(`Error in creating review \n${error}`);
        throw error
    }
}

export const findReviewsByBookId = async (bookId) => {
    try {
        return await Review.find({bookId:bookId});
    } catch (error) {
        console.error(`Error in fetching Reviews \n${error}`);
        throw error;
    }
}

export const findReviewById = async (reviewId) => {
    try {
        return await Review.findById(reviewId);
    } catch (error) {
        console.error(`Error in fetching the Review\n${error}`);
        throw error;
    }
}

export const deleteReviewById = async (reviewId) => {
    try {
        return await Review.findByIdAndDelete(reviewId);
    } catch (error) {
        console.error(`Error in deleting the Review\n${error}`);
        throw error;
    }
}