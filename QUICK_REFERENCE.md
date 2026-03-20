# PayTM Integration - Quick Reference Guide

## Your PayTM Credentials (Configured)
```
Merchant ID:  WtByJK14940032907936
Merchant Key: L&J4_ezs5LC8T#tA
Website:      DEFAULT
Channel:      WEB
```

## Start Development
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
npm run dev
```

Backend runs on: http://localhost:3002  
Frontend runs on: http://localhost:5173  

## Test Payment Integration
1. Visit: http://localhost:5173/payment-test
2. Click "Test Payment Initiation"
3. Verify checksum is generated
4. Check logs in backend terminal

## Live Payment Flow
1. Add items to cart
2. Go to checkout
3. Click "Pay with Paytm"
4. You'll be redirected to PayTM gateway
5. After payment, redirect to order confirmation

## API Endpoints (Local Testing)
```bash
# Health Check
curl http://localhost:3002/api/payment/health

# Initiate Payment
curl -X POST http://localhost:3002/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST_001",
    "amount": "100.00",
    "customerId": "CUST_001",
    "customerEmail": "test@example.com",
    "customerPhone": "9876543210"
  }'
```

## For Production Deployment
Update in `backend/.env`:
```
PAYTM_CALLBACK_URL=https://yourbackend.com/api/payment/callback
FRONTEND_URL=https://yourfrontend.com
```

Update CORS in `backend/server.js`:
Add your production domains to the origin array.

## Key Files
- `backend/.env` - Configuration
- `backend/routes/payment.js` - Payment logic
- `src/components/PaymentModal.tsx` - Payment UI
- `src/pages/OrderConfirmation.tsx` - Order status
- `src/pages/PaymentTest.tsx` - Testing utilities

## Documentation
- `IMPLEMENTATION_SUMMARY.md` - Full overview
- `PAYMENT_SETUP_GUIDE.md` - Detailed setup
- `PAYMENT_TEST_REPORT.md` - Test results
- `QUICK_REFERENCE.md` - This file

## Common Issues

**Q: Checksum error?**  
A: Verify merchant key in .env is exactly correct (including special chars)

**Q: Payment gateway not loading?**  
A: Check browser console for script errors, verify CORS settings

**Q: Callback not redirecting?**  
A: Verify PAYTM_CALLBACK_URL and FRONTEND_URL in .env are correct

**Q: Port already in use?**  
A: Change PORT in .env or kill process using the port

## Backend Status Check
```bash
curl http://localhost:3002/api/payment/health
# Should return: {"success":true,"status":"healthy",...}
```

## Monitor Logs
```bash
# Backend logs
tail -f /tmp/backend.log

# Frontend console
Open DevTools in browser (F12) → Console tab
```

## Next Steps
1. ✅ Local testing complete
2. 🔄 Staging deployment (update .env URLs)
3. 🚀 Production deployment (add domains to CORS)
4. 📊 Enable monitoring and alerts
5. 💾 Database integration (order tracking)

---

**Need more details?** Read the full documentation files above.

**All set?** Deploy to production!
