export const getBooksByLimitAndOffset = async (query, limit, offset) => {
  try {
    limit = limit <= 20 ? limit : 20;
    const URI = `https://www.googleapis.com/books/v1/volumes?q=${
      query || "legend"
    }&startIndex=${offset || 0}&maxResults=${
      limit || 20
    }&projection=lite&orderBy=newest&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const res = await fetch(URI);
    if (!res.ok) {
      throw new Error("Failed to fetch books from Google Books API");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBookByVolumeId = async (volumeId) => {
  try {
    const URI = `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const res = await fetch(URI);
    if (!res.ok) {
      throw new Error("Failed to fetch the Book from Google Books API");
    } else if (res.ok) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
