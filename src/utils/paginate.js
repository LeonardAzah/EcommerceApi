const paginate = async (model, page, limit, selectFields, filter = {}) => {
  const skip = (page - 1) * limit;

  try {
    const totalItems = await model.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    let query = model.find(filter);

    if (selectFields) {
      query = query.select(selectFields);
    }

    const data = await query.limit(limit).skip(skip).exec();

    const paginationResult = {
      data,
      currentPage: page,
      totalPages,
    };

    // Add previous and next page links
    if (page < totalPages) {
      paginationResult.nextPage = `/products?page=${page + 1}&limit=${limit}`;
    }
    if (page > 1) {
      paginationResult.prevPage = `/products?page=${page - 1}&limit=${limit}`;
    }

    return paginationResult;
  } catch (error) {
    throw new Error("Pagination error");
  }
};

module.exports = paginate;
