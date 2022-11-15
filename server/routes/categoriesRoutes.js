//importing modules
const express = require('express')
const categoriesController = require('../controllers/categoriesController')

const router = express.Router()

// categories route endpoint
router.get('/', categoriesController.categories_get)
router.post('/create', categoriesController.categories_post)
router.put('/update/:id', categoriesController.categories_update)
router.delete('/delete/:id', categoriesController.categories_delete)

// categories - get all Products or by id
router.get('/allProducts', categoriesController.findProductsByCategory)
router.get('/:id', categoriesController.findCategoryById)


module.exports = router 