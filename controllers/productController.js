const creatProduct = async (req, res) => {
  res.send("Creating product");
};

const getAllProducts = async (req, res) => {
  res.send("Getting all products..");
};

const getSingleProduct = async (req, res) => {
  res.send("Getting single user");
};

const updateProduct = async (req, res) => {
  res.send("Updating product");
};

const deleteProduct = async (req, res) => {
  res.send("Deleting product..");
};

const uploadImage = async (req, res) => {
  res.send("Uploading image");
};

module.exports = {
  creatProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
