

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();

// // MongoDB connection
// mongoose.connect('mongodb://devansh:secret@localhost:27017/user-account?authSource=admin', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Define user schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });
// const User = mongoose.model('User', userSchema);

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// // Routes
// app.get('/', async (req, res) => {
//   try {
//     const users = await User.find().sort({ name: 1 });  // Get all users, sorted by name
//     res.render('form', { users });
//   } catch (err) {
//     res.status(500).send('Error fetching users: ' + err.message);
//   }
// });

// app.post('/submit', async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const newUser = new User({ name, email });
//     await newUser.save();
//     res.redirect('/');  // Redirect to '/' to show updated user list
//   } catch (err) {
//     res.status(500).send('Error saving user: ' + err.message);
//   }
// });

// // Start server
// app.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Use environment variables for MongoDB connection
const mongoHost = process.env.MONGO_HOST || 'mongodb';
const mongoUser = process.env.MONGO_DB_USERNAME || 'devansh';
const mongoPassword = process.env.MONGO_DB_PWD || 'secret';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDatabase = process.env.MONGO_DATABASE || 'user-account';

const mongoUri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`;

// MongoDB connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });  // Get all users, sorted by name
    res.render('form', { users });
  } catch (err) {
    res.status(500).send('Error fetching users: ' + err.message);
  }
});

app.post('/submit', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.redirect('/');  // Redirect to '/' to show updated user list
  } catch (err) {
    res.status(500).send('Error saving user: ' + err.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});