const express = require('express');
const router = express.Router();
const {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getTestimonialById,
} = require('../../Controllers/Testimonal/Testimonal');

// Create a new testimonial
router.post('/testimonials', createTestimonial);

// Update a testimonial by ID
router.put('/testimonials/:id', updateTestimonial);

// Delete a testimonial by ID
router.delete('/testimonials/:id', deleteTestimonial);

// Get all testimonials
router.get('/testimonials', getAllTestimonials);

// Get a testimonial by ID
router.get('/testimonials/:id', getTestimonialById);

 module.exports = router;




 
 
// Create Testimonial (POST Request):

// HTTP Method: POST
// URL: http://localhost:3000/api/testimonials (Replace http://localhost:3000 with your actual server URL if different)
// Headers: (if any, such as Content-Type: application/json)
// Body: Select the raw option and use the following JSON as the request body:
// json
// Copy code
// {
//   "name": "John Doe",
//   "email": "john.doe@example.com",
//   "mobileNo": 1234567890,
//   "occupation": "Software Engineer",
//   "approval": "Approved",
//   "block": "A"
// }
// Update Testimonial by ID (PUT Request):

// HTTP Method: PUT
// URL: http://localhost:3000/api/testimonials/{testimonial_id} (Replace {testimonial_id} with the actual ID of the testimonial you want to update)
// Headers: (if any, such as Content-Type: application/json)
// Body: Select the raw option and use the following JSON as the request body:
// json
// Copy code
// {
//   "name": "Updated Name",
//   "email": "updated.email@example.com",
//   "mobileNo": 9876543210,
//   "occupation": "Updated Occupation",
//   "approval": "Updated Approval",
//   "block": "B"
// }
// Delete Testimonial by ID (DELETE Request):

// HTTP Method: DELETE
// URL: http://localhost:3000/api/testimonials/{testimonial_id} (Replace {testimonial_id} with the actual ID of the testimonial you want to delete)
// Get All Testimonials (GET Request):

// HTTP Method: GET
// URL: http://localhost:3000/api/testimonials
// Get Testimonial by ID (GET Request):

// HTTP Method: GET
// URL: http://localhost:3000/api/testimonials/{testimonial_id} (Replace {testimonial_id} with the actual ID of the testimonial you want to retrieve)