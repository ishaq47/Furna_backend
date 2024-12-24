const AdminUser = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


console.log(process.env.JWT_SECRET);
const register = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  // Check if the user is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send('Forbidden: Only admins can register new admins');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new AdminUser({ username, email, password: hashedPassword, isAdmin });
  await newUser.save();
  res.status(201).send('Admin user registered');
}

const initialRegister = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new AdminUser({ username, email, password: hashedPassword, isAdmin: true });
  await newUser.save();
  res.status(201).send('Initial admin user registered');
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminUser.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  res.json({ token });

}

const dashboard = (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send('Forbidden: Only admins can access the dashboard');
  }
  res.send('Welcome to the admin dashboard');
}

module.exports = { login, register, dashboard, initialRegister }
