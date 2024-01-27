const { body } = require('express-validator');

// Validation middleware for creating a new AddNewOffer
const validateAddNewOffer = [
    body('date').notEmpty().isString(),
    body('des').notEmpty().isString(),
    body('status').notEmpty().isString(),
    body('block').notEmpty().isString(),
];

module.exports = {
    validateAddNewOffer,
};
