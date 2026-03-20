# Payment Backend - Paytm Integration

## Setup Instructions

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables in `.env` file (already created with your credentials)

3. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:3000

## API Endpoints

### POST /api/payment/initiate
Initiates a payment transaction
```json
{
  "orderId": "ORDER123",
  "amount": 1000,
  "customerId": "CUST001",
  "customerEmail": "customer@example.com",
  "customerPhone": "9876543210"
}
```

### POST /api/payment/callback
Handles Paytm callback after payment

### POST /api/payment/status
Check payment status
```json
{
  "orderId": "ORDER123"
}
```

## Deploy to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" and select "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and set up the service
6. Add these environment variables in Render dashboard:
   - `PAYTM_MERCHANT_ID`: WtByJK14940032907936
   - `PAYTM_MERCHANT_KEY`: L&J4_ezs5LC8T#tA
   - `PAYTM_CALLBACK_URL`: https://varshini-enterprises-gqnz.onrender.com/api/payment/callback

## Deployed URLs

- Backend: https://varshini-enterprises-gqnz.onrender.com
- Frontend: https://varshinienterprises.vercel.app

## Important Notes

- Currently configured for Paytm STAGING environment
- For production, update PAYTM_TRANSACTION_URL and PAYTM_STATUS_URL in .env
- Production URLs:
  - Transaction: https://securegw.paytm.in/order/process
  - Status: https://securegw.paytm.in/order/status
- The `render.yaml` file is configured for production deployment
