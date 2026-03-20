const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
app.use(cors({
  origin: [
    'https://varshinienterprises.vercel.app',
    'https://varshini-enterprises-eta.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/payment', paymentRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Varshini Enterprises Payment API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      initiatePayment: 'POST /api/payment/initiate',
      paymentCallback: 'POST /api/payment/callback',
      paymentStatus: 'POST /api/payment/status'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Payment server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`);
});
