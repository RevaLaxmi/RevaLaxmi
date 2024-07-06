// server.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://revachauhan1:WLO6BYSJfCTr0MR4@cluster0.jynpokg.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define MongoDB schema and model (for example)
const FormSubmissionSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone_number: String,
  subject: String,
  message: String,
  submitted_at: { type: Date, default: Date.now }
});

const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);

// Routes
app.post('/submit-form', (req, res) => {
  const { full_name, email, phone_number, subject, message } = req.body;

  // Create a new submission instance
  const newSubmission = new FormSubmission({
    full_name,
    email,
    phone_number,
    subject,
    message
  });

  // Save to database
  newSubmission.save()
    .then(submission => {
      console.log('Form submission saved:', submission);
      res.status(200).send('Form submission successful');
    })
    .catch(err => {
      console.error('Error saving form submission:', err);
      res.status(500).send('Internal server error');
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
