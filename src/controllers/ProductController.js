import BaseController from './BaseController.js'
import Product from '../models/Product.js'

class ProductController extends BaseController {
  async getProducts(req, res) {
    try {
      const products = await Product.get()
      return this.success(res, 'Products retrieved successfully', products)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to fetch products', 500)
    }
  }

  async createProduct(req, res) {
    try {
      const { name, price } = req.body
      if (!name || !price) {
        return this.error(res, 'Name and price are required', 400)
      }

      const product = await Product.create({ name, price })
      return this.success(res, 'Product created', product, 201)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to create product', 500)
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params
      const { name, price } = req.body
      if (!name || !price) {
        return this.error(res, 'Name and price are required', 400)
      }

      const updatedProduct = await Product.update(id, { name, price })
      if (!updatedProduct) {
        return this.error(res, 'Product not found', 404)
      }

      return this.success(res, 'Product updated', updatedProduct)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to update product', 500)
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params
      const affectedRows = await Product.delete(id)
      if (!affectedRows) {
        return this.error(res, 'Product not found', 404)
      }

      return this.success(res, 'Product deleted', null)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to delete product', 500)
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params
      const product = await Product.find(id)
      if (!product) {
        return this.error(res, 'Product not found', 404)
      }

      return this.success(res, 'Product retrieved successfully', product)
    } catch (error) {
      console.error(error)
      return this.error(res, 'Failed to fetch product', 500)
    }
  }
}

export default new ProductController()