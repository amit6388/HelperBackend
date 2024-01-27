const express = require('express');
const router = express.Router();
const addNewOfferController = require('../controllers/addNewOfferController');
const { validateAddNewOffer } = require('../validators/addNewOfferValidator');

// Create a new AddNewOffer
router.post('/addnewoffer', upload.single('image'), validateAddNewOffer, addNewOfferController.createAddNewOffer);

// Delete an AddNewOffer by ID
router.delete('/addnewoffer/:id', addNewOfferController.deleteAddNewOffer);

// Update an AddNewOffer by ID
router.put('/addnewoffer/:id', upload.single('image'), validateAddNewOffer, addNewOfferController.updateAddNewOffer);

// Get all AddNewOffers
router.get('/addnewoffer', addNewOfferController.getAllAddNewOffers);

// Get an AddNewOffer by ID
router.get('/addnewoffer/:id', addNewOfferController.getAddNewOfferById);

module.exports = router;
