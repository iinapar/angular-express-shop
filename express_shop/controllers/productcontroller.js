const Product = require('../models/product');

const productcontroller = {
  // Yksittäisen tuotteen haku id:n perusteella
  productById: (req, res) => {
    Product.findOne({ _id: req.params.id }, (error, product) => {
      if (error || !product) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }
      res.json(product);
    });
  },

  // Kaikkien tuotteiden haku
  allProducts: (req, res) => {
    Product.find((error, products) => {
      if (error || !products) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json(products);
    });
  },

  // Tuotteiden haku kategorian mukaan
  productsByCategory: (req, res) => {
    Product.find({ category: req.params.category }, (err, products) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found for this category' });
      }
      res.json(products);
    });
  },

  // Uuden tuotteen lisääminen
  addProduct: (req, res) => {
    const newProduct = Product(req.body);
    Product.create(newProduct)
      .then((product) => {
        console.log('New product inserted succesfully:' + product);
        res.json(product);
      })
      .catch((error) => {
        return res.status(400).json({
          error: 'Error creating product',
        });
      });
  },

  // Olemassa olevan tuotteen päivitys
  updateProduct: (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedProduct) => {
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        console.log('Product updated successfully:', updatedProduct);
        res.json(updatedProduct);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      });
  },

  // Tuotteen poisto
  deleteProductById: (req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, product) => {
      if (error) {
        return res.status(400).json({
          error: 'Error deleting product',
        });
      }
      console.log('Product deleted');
      res.json(product);
    });
  },
};

module.exports = productcontroller;
