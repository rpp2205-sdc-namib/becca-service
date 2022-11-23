const Pool = require('pg').Pool
const pool = new Pool({
  user: 'beccakekerchen',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432
})

const getProducts = (request, response) => {
  pool.query('select * from styles where product_id=1', (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getProducts
}