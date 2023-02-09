const express = require('express');

const { Category, Supplier, Product, Promotion } = require('../models');

const crudController = require('../controllers/crud-controller');
const productController = require('../controllers/product-controller');
const { CATEGORY, CATEGORY_ID, SUPPLIER, SUPPLIER_ID, PRODUCT, PRODUCT_ID } = require('../config/constant');

const router = express.Router();

// category
router.get('/categories', crudController.getAllRecords(Category));                                      // get all
router.get('/categories/:categoryId', productController.getAllProductsByForeignKeyId(CATEGORY_ID));     // get all product where category_id = categoryId
// brand (supplier)
router.get('/brands', crudController.getAllRecords(Supplier));                                          // get all
router.get('/brands/:supplierId', crudController.getRecordById(Supplier, SUPPLIER_ID, SUPPLIER));       // get by id
// product
router.get('/products', crudController.getAllRecords(Product));                                         // get all
router.get('/products/:productId', crudController.getRecordById(Product, PRODUCT_ID, PRODUCT));         // get by id
// promotion
router.get('/promotions', crudController.getAllRecords(Promotion));                                     // get all

module.exports = router;