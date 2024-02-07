import { getBookByVolumeId, getBooksByLimitAndOffset } from "../services/books.service.js";

export const getBooks = async (req, res) => {
  try {
    const {query,limit , offset} = req.query;
    console.log(limit,offset);
    const books = await getBooksByLimitAndOffset(query,limit,offset);
    console.log(books);
    return res.status(200).json({books})
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: error.message})
  }
};

export const getBookById = async (req , res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const book = await getBookByVolumeId(id);
        console.log(book);
        return res.status(200).json({book});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}