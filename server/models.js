const pool = require('../db/db.js');

const readProducts = (page, count) => {
  var query = `SELECT * FROM product LIMIT ${count} OFFSET ${(page - 1) * count}`;

  return pool
  .query(query)
  .then((results) => {
    return results.rows
  })
  .catch(err => console.log(err))
}

const readOneProduct = (product_id) => {
  var query = `SELECT p.*,
  ARRAY(SELECT json_build_object(
    'feature', f.feature,
    'value', f.value
  ) FROM features f WHERE f.product_id = p.id) as features
  FROM product p WHERE id=${product_id};`

  return pool
  .query(query)
  .then((results) => {
    return results.rows
  })
  .catch(err => console.log(err))
}

module.exports = {
  readProducts,
  readOneProduct
}