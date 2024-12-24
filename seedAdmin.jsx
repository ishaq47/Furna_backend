const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AdminUser = require('./models/adminModel');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    const adminUser = new AdminUser({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
