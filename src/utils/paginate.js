const paginate = async ({
  model,
  page = 1,
  limit = 10,
  selectFields = "",
  filters = {},
  populateOptions = [],
}) => {
  const skip = (page - 1) * limit;

  try {
    const totalItems = await model.countDocuments(filters);
    const totalPages = Math.ceil(totalItems / limit);

    let query = model.find(filters);

    if (selectFields) {
      query = query.select(selectFields);
    }

    if (populateOptions && populateOptions.length > 0) {
      for (const { model: refModel, path, select } of populateOptions) {
        // Modify the populate object to include select fields if specified
        const populateObject = { path, model: refModel };
        if (select) {
          populateObject.select = select;
        }
        query = query.populate(populateObject);
      }
    }

    const data = await query.limit(limit).skip(skip).exec();

    const paginationResult = {
      data,
      currentPage: page,
      totalPages,
    };

    // Add previous and next page links
    if (page < totalPages) {
      paginationResult.nextPage = page + 1;
    }
    if (page > 1) {
      paginationResult.prevPage = page - 1;
    }

    return paginationResult;
  } catch (error) {
    console.log(error);
    throw new Error("Pagination error");
  }
};

module.exports = paginate;
