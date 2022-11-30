const Pool = require('pg').Pool
const pool = new Pool({
  user: 'beccakekerchen',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432
})

module.exports = pool;