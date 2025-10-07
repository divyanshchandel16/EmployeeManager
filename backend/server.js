const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins in development, or specific origins in production
    if (process.env.NODE_ENV !== 'production' || !origin) {
      return callback(null, true);
    }
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (_req, res) => {
  res.json({ 
    message: 'Employee Manager API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      employees: '/api/employees'
    }
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/employees', require('./src/routes/employees'));

// Mongo Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee_mvp';

mongoose
  .connect(mongoUri, { 
    autoIndex: false, // Disable autoIndex to prevent duplicate index warnings
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    // Don't exit process in serverless environment
  });

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = app;


