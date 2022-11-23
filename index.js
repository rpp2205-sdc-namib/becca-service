const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./db/db.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/products', db.getProducts); //query to ensure connection to db, will edit to get all products

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})