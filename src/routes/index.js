const router = require('express').Router();
const faker = require('faker');

const Product = require('../models/product');

// routes 
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/add-product', (req, res, next) => {
  res.render('products/add-product');
})
router.post('/add-product', (req, res, next) => {
  const product    = new Product();
  product.category = req.body.category_name;
  product.name     = req.body.product_name;
  product.price    = req.product_price;
  product.cover    = faker.image.image();
  product.save((err) => {
    if (err) {throw err; }
    res.redirect('/add-product');
  })
});


router.get('/products/', (req, res) => {
  res.redirect('/products/1');
});

// products with pagination
router.get('/products/:page', (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;

  Product.find({}) // get all docs
    .skip((perPage * page) - page) // in the first page, the value of the skip is 0
    .limit(perPage) // output just 9 items
    .exec((err, products) => {
      Product.count((err, count) => { // count to calculate the number of pages
        if (err) { return next(err); }
        res.render('products/products', {
          products,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});




// router for generating fake data with faker
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 50; i++) {
    const product    = new Product();
    product.category = faker.commerce.department();
    product.name     = faker.commerce.productName();
    product.price    = faker.commerce.price();
    product.cover    = faker.image.image();
    product.save(err => {
      if (err) { return next(err); }
    })
  }
  res.redirect('/add-product');
});

module.exports = router;