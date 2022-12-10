const pool = require('../db/db.js');

const readProducts = (page, count) => {
  var query = `SELECT * FROM product WHERE id > ${(page - 1) * count} ORDER BY id ASC FETCH FIRST ${count} ROWS ONLY`;
             // `SELECT * FROM product where id IN (SELECT id FROM product ORDER BY id ASC LIMIT 5 OFFSET (100100 - 1) * 5);`
             //`SELECT * FROM product WHERE id > ${(page - 1) * count} ORDER BY id ASC FETCH FIRST 5 ROWS ONLY`
             //SELECT * FROM product where id IN (SELECT id FROM product ORDER BY id ASC LIMIT ${count} OFFSET ${(page - 1) * count})

  return pool
  .query(query)
  .then((results) => {
    console.log(results.rows)
    console.log(page, count)
    return results.rows
  })
  .catch(err => console.log(err, page, count))
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
    return results.rows[0]
  })
  .catch(err => console.log(err))
}

const readStyles = (product_id) => {
  var query = ` select
    array_agg(json_build_object(
          'style_id', s.id,
          'name', s.name,
          'original_price', s.original_price,
          'sale_price', s.sale_price,
          'default?', s.default,
          'photos', (
                    SELECT array_to_json(array_agg(pho))
                    FROM (
                      SELECT ph.thumbnail_url, ph.url
                      FROM photos ph
                      WHERE ph.style_id = s.id ) pho
                ),
                'skus', (
                  SELECT jsonb_object_agg(
                    sk.id, json_build_object(
                      'size', sk.size,
                      'quantity', sk.quantity
                    )
                  )FROM skus sk WHERE sk.style_id = s.id
                )
)) as results
  from product p
  inner join styles s on s.product_id = p.id
  where p.id = ${product_id};`

  return pool
  .query(query)
  .then((results) => {
    let read = Object.assign({'product_id': product_id}, results.rows[0]);
    return read
  })

  .catch(err => console.log(err))
}

const readRelated = (product_id) => {
  var query = `SELECT
  json_agg(r.related_id)
  FROM related r WHERE product_id = ${product_id};`

  return pool
  .query(query)
  .then((results) => {
    return results.rows[0].json_agg
  })
  .catch(err => console.log(err))
}

module.exports = {
  readProducts,
  readOneProduct,
  readStyles,
  readRelated
}