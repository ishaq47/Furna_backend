const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const adminRoute = require('./routes/adminRoute');
const app = express();
const PORT = 5000;
const dotenv = require('dotenv');
dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
