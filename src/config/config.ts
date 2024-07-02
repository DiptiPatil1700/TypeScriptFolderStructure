import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
  jwtSecret: process.env.JWT_SECRET || 'userstructurefolder',
};

export default config;