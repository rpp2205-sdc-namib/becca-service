const axios = require('axios');
const path = 'http://localhost:3000';

test('adds 2 + 2 to equal 4', () => {
  expect(2 + 2).toBe(4);
});

test('getProducts', async () => {
  return axios.get(path + '/products')
  .then((response) => {
    console.log(response.data)
    expect(response.data).toBeDefined();
  })
})

test('getOneProduct', async () => {
  return axios.get(path + '/products/233')
  .then((response) => {
    expect(response.data).toBeDefined();
  })
})

test('getRelated', async () => {
  return axios.get(path + '/products/233/related')
  .then((response) => {
    expect(response.data).toBeDefined();
  })
})