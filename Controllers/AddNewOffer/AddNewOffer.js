const multer = require('multer');
const path = require('path');
const { validationResult } = require('express-validator');
const AddNewOfferModel = require('../models/AddNewOfferModel');
 
// Multer configuration for handling image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Create a new AddNewOffer
const createAddNewOffer = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { date, des, status, block } = req.body;
        const image = req.file ? req.file.path : '';

        const addNewOffer = new AddNewOfferModel({
            date,
            des,
            image,
            status,
            block,
        });

        await addNewOffer.save();
        res.status(201).json(addNewOffer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete an AddNewOffer by ID
const deleteAddNewOffer = async (req, res) => {
    try {
        const addNewOffer = await AddNewOfferModel.findByIdAndRemove(req.params.id);
        if (!addNewOffer) {
            return res.status(404).json({ error: 'AddNewOffer not found' });
        }
        res.status(200).json({ message: 'AddNewOffer deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an AddNewOffer by ID
const updateAddNewOffer = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { date, des, status, block } = req.body;
        const image = req.file ? req.file.path : '';

        const addNewOffer = await AddNewOfferModel.findByIdAndUpdate(
            req.params.id,
            {
                date,
                des,
                image,
                status,
                block,
            },
            { new: true }
        );

        if (!addNewOffer) {
            return res.status(404).json({ error: 'AddNewOffer not found' });
        }

        res.status(200).json(addNewOffer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all AddNewOffers
const getAllAddNewOffers = async (req, res) => {
    try {
        const addNewOffers = await AddNewOfferModel.find();
        res.status(200).json(addNewOffers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get an AddNewOffer by ID
const getAddNewOfferById = async (req, res) => {
    try {
        const addNewOffer = await AddNewOfferModel.findById(req.params.id);
        if (!addNewOffer) {
            return res.status(404).json({ error: 'AddNewOffer not found' });
        }
        res.status(200).json(addNewOffer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createAddNewOffer,
    deleteAddNewOffer,
    updateAddNewOffer,
    getAllAddNewOffers,
    getAddNewOfferById,
};
