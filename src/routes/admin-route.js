const express = require('express');

const { Category, Supplier, Product } = require('../models');

const crudController = require('../controllers/crud-controller');
const { CATEGORY, CATEGORY_ID, SUPPLIER, SUPPLIER_ID, PRODUCT, PRODUCT_ID } = require('../config/constant');

const router = express.Router();

// category
router.post('/categories', crudController.createRecord(Category, CATEGORY));
router.get('/categories', crudController.getAllRecords(Category));
router.patch('/categories/:categoryId', crudController.updateRecord(Category, CATEGORY_ID, CATEGORY));
router.delete('/categories/:categoryId', crudController.deleteRecord(Category, CATEGORY_ID, CATEGORY));
// supplier
router.post('/suppliers', crudController.createRecord(Supplier, SUPPLIER));
router.get('/suppliers', crudController.getAllRecords(Supplier));
router.patch('/suppliers/:supplierId', crudController.updateRecord(Supplier, SUPPLIER_ID, SUPPLIER));
router.delete('/suppliers/:supplierId', crudController.deleteRecord(Supplier, SUPPLIER_ID, SUPPLIER));
// product
router.post('/products', crudController.createRecord(Product, PRODUCT));
router.get('/products', crudController.getAllRecords(Product));
router.patch('/products/:productId', crudController.updateRecord(Product, PRODUCT_ID, PRODUCT));
router.delete('/products/:productId', crudController.deleteRecord(Product, PRODUCT_ID, PRODUCT));

module.exports = router;