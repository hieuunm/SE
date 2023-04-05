// import path from 'path';
// import productModel from '../models/productModel';
const { models: { Product } } = require('../models/');

class productController {
  // [GET] /products
  async getAllProducts(req, res, next) {
    try {
      const result = await Product.findAll();
      return res.status(200).send(result);
    } catch (error) {
      console.log("can't render all products");
      next(error);
    }
  }

  // [GET] /products/:id
  async getProduct(req, res, next) {
    const id = req.params.id;
    try {
      const result = await Product.findOne({
        where: {
          id,
        },
      });

      if (result) return res.status(200).send(result);
      else {
        res.status(404).json({
          message: 'Not Found',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // [POST] /products/add
  async addProduct(req, res, next) {
    const { title, contents } = req.body;
    if (!title || !contents) {
      return res.status(400).json({ message: 'fill all attributes' });
    }
    try {
      const result = await Product.findOrCreate({
        where: {
          title: title,
          contents: contents,
        }
      });
      return res.status(200).send(result);
    } catch (error) {
      console.log('Cant add product!');
      next(error);
    }
  }

  // [PUT] /products/:id/modify
  async modifyProduct(req, res, next) {
    const IDProduct = req.params.id;
    const { title, contents } = req.body;

    if (!title && !contents) {
      res.status(400).json({ message: 'Nothing changed' });
    }

    try {
      // check whether product exist or not
      const checkIdExist = await Product.findOne({
        where: {
          id: IDProduct,
        },
      });

      if (!checkIdExist) {
        return res.status(404).json({ message: 'Cant detect product! ' });
      } else {
        const result = Product.update({ title, contents }, {
          where: {
            id: IDProduct
          }
        }
        );
        return res.status(200).send('Modify product: Success!');
      }
    } catch (error) {
      console.log('cant modify product! ');
      next(error);
    }
  }

  // [DELETE] /products/:id/delete
  async deleteProduct(req, res, next) {
    const IDProduct = req.params.id;
    try {
      // check whether product exist or not
      const checkIdExist = await Product.findOne({
        where: {
          id: IDProduct,
        },
      });

      if (!checkIdExist) {
        return res.status(404).json({ message: 'Cant detect product! ' });
      } else {
        const result = Product.destroy({ where: { id: IDProduct } });
        return res.status(200).send(result);
      }
    } catch (error) {
      console.log('cant delete product! ');
      next(error);
    }
  }
}

// export default new productController();
module.exports = new productController();