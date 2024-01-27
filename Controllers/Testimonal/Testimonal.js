const { validationResult } = require('express-validator');
const TestimonialModel = require('../../Models/Testimonal/testimonal');
const {
  createTestimonialValidationRules,
  updateTestimonialValidationRules,
} = require('../../validations/testimonal');

// Function to check if an email is a duplicate
const isEmailDuplicate = async (email) => {
  const existingTestimonial = await TestimonialModel.findOne({ email });
  return !!existingTestimonial;
};

// Create a new testimonial
exports.createTestimonial = [
  createTestimonialValidationRules,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, mobileNo, occupation, approval, block } = req.body;

      // Check if email is a duplicate
      const isDuplicate = await isEmailDuplicate(email);

      if (isDuplicate) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const testimonial = new TestimonialModel({
        name,
        email,
        mobileNo,
        occupation,
        approval,
        block,
      });
      await testimonial.save();
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

// Update a testimonial by ID
exports.updateTestimonial = [
  updateTestimonialValidationRules,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name, email, mobileNo, occupation, approval, block } = req.body;

      // Check if email is a duplicate, excluding the current testimonial being updated
      const existingTestimonial = await TestimonialModel.findOne({
        email,
        _id: { $ne: id },
      });

      if (existingTestimonial) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
        id,
        { name, email, mobileNo, occupation, approval, block },
        { new: true }
      );

      if (!updatedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }

      res.status(200).json(updatedTestimonial);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

// Delete a testimonial by ID
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await TestimonialModel.findByIdAndRemove(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await TestimonialModel.findById(id);

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
