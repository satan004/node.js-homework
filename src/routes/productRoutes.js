import express from 'express'
import productController from '../controllers/ProductController.js'

const router = express.Router()

router.get('/', productController.getProducts.bind(productController))
router.get('/:id', productController.getProduct.bind(productController))
router.post('/', productController.createProduct.bind(productController))
router.put('/:id', productController.updateProduct.bind(productController))
router.delete('/:id', productController.deleteProduct.bind(productController))

export default router