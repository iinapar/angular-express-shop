const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const pc = require('../controllers/productcontroller');
const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

// Kaikkien tuotteiden haku
router.get('/', pc.allProducts);

// reitti yksittäiselle tuotteelle id:n perusteella
router.get('/:id', pc.productById);

// reitti tuotteiden hakuun kategorian mukaan
router.get('/categories/:category', pc.productsByCategory);

// reitti uuden tuotteen lisäämiseen
router.post('/', authorize, pc.addProduct);

// reitti tuotteen muokkaamiseen
router.put('/:id', authorize, pc.updateProduct);

// reitti tuotteen poistamiseen
router.delete('/:id', authorize, pc.deleteProductById);

module.exports = router;
