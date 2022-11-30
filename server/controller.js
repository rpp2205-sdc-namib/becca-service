const { readProducts, readOneProduct } = require('./models.js');

const getProducts = (req, res) => {
  let count = req.query.count || 5;
  let page = req.query.page || 1;

  readProducts(page, count)
  .then((results) => {
    console.log(results)
    res.send(results)
  })
  .catch(err => console.log(err))
}

const getOneProduct = (req, res) => {
  let product_id = req.params.product_id;
  readOneProduct(product_id)
  .then((results) => {
    console.log(results)
    res.send(results)
  })
  .catch(err => console.log(err))
}

module.exports = {
  getProducts,
  getOneProduct
}