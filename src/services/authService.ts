import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';
import { isValidEmail } from '../utils/validation';
import logger from '../utils/logger';

const register = async (userData: any) => {
  const { email, password, name } = userData;
  if (!isValidEmail(email)) {
    logger.error('Invalid email address');
   
    throw new Error ( 'Invalid email address' );;
  }
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({
    email,
    password: hashedPassword,
    name,
    createdAt: new Date()
  });

  await user.save();
  return user;
};

const login = async (userData: any) => {
  const { email, password } = userData;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Create JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
    expiresIn: '1h'
  });

  return token;
};

export default { register, login };

