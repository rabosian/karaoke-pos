//importing modules
const express = require('express')
const productsController = require('../controllers/productsController')

const router = express.Router()

// products route endpoint
router.get('/', productsController.products_get)
router.post('/create', productsController.products_post)
router.put('/update/:id', productsController.products_update)
router.delete('/delete/:id', productsController.products_delete)

router.get('/:id', productsController.findProductById)


module.exports = router