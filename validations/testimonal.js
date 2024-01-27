const { body } = require('express-validator');

// Validation rules for creating a testimonial
exports.createTestimonialValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('mobileNo').isNumeric().withMessage('Mobile number must be numeric'),
  body('occupation').notEmpty().withMessage('Occupation is required'),
  body('approval').notEmpty().withMessage('Approval status is required'),
  body('block').notEmpty().withMessage('Block is required'),
];

// Validation rules for updating a testimonial
exports.updateTestimonialValidationRules = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('mobileNo').optional().isNumeric().withMessage('Mobile number must be numeric'),
  body('occupation').optional().notEmpty().withMessage('Occupation is required'),
  body('approval').optional().notEmpty().withMessage('Approval status is required'),
  body('block').optional().notEmpty().withMessage('Block is required'),
];
