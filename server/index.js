const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('../db/db.js');
const { getProducts, getOneProduct, getStyles, getRelated } = require('./controller.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/products', getProducts);

app.get('/products/:product_id', getOneProduct);

app.get('/products/:product_id/styles', getStyles);

app.get('/products/:product_id/related', getRelated);

app.listen(port, () => {
  console.log(`Listening on localhost ${port} :)`)
})