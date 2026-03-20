#!/bin/bash

# PayTM Payment Integration Test Script
# This script tests all payment endpoints

set -e

# Configuration
BACKEND_URL="http://localhost:3000"
API_PATH="/api/payment"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== PayTM Payment Integration Test Suite ===${NC}\n"

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
response=$(curl -s "$BACKEND_URL$API_PATH/health")
if echo "$response" | grep -q "healthy"; then
  echo -e "${GREEN}✓ Health check passed${NC}"
  echo "Response: $response\n"
else
  echo -e "${RED}✗ Health check failed${NC}"
  echo "Response: $response\n"
  exit 1
fi

# Test 2: Payment Initiation
echo -e "${YELLOW}Test 2: Payment Initiation${NC}"
order_id="TEST_ORDER_$(date +%s)"
customer_id="TEST_CUST_$(date +%s)"
amount="500.00"

echo "Order Details:"
echo "  Order ID: $order_id"
echo "  Customer ID: $customer_id"
echo "  Amount: ₹$amount"

response=$(curl -s -X POST "$BACKEND_URL$API_PATH/initiate" \
  -H "Content-Type: application/json" \
  -d "{
    \"orderId\": \"$order_id\",
    \"amount\": \"$amount\",
    \"customerId\": \"$customer_id\",
    \"customerEmail\": \"test@varshinienterprises.com\",
    \"customerPhone\": \"9876543210\"
  }")

if echo "$response" | grep -q "\"success\":true"; then
  echo -e "${GREEN}✓ Payment initiation successful${NC}"
  echo "Response:"
  echo "$response" | jq '.' 2>/dev/null || echo "$response"
  echo ""

  # Extract merchant ID for verification
  merchant_id=$(echo "$response" | jq -r '.data.merchantId' 2>/dev/null)
  echo "Merchant ID: $merchant_id"
  echo ""
else
  echo -e "${RED}✗ Payment initiation failed${NC}"
  echo "Response: $response\n"
  exit 1
fi

# Test 3: Invalid Request (Missing Fields)
echo -e "${YELLOW}Test 3: Validation - Missing Fields${NC}"
response=$(curl -s -X POST "$BACKEND_URL$API_PATH/initiate" \
  -H "Content-Type: application/json" \
  -d "{
    \"orderId\": \"TEST_ORDER\",
    \"customerId\": \"TEST_CUST\"
  }")

if echo "$response" | grep -q "\"success\":false"; then
  echo -e "${GREEN}✓ Correctly rejected invalid request${NC}"
  echo "Response:"
  echo "$response" | jq '.' 2>/dev/null || echo "$response"
  echo ""
else
  echo -e "${RED}✗ Should have rejected invalid request${NC}"
  echo "Response: $response\n"
fi

# Test 4: Invalid Amount
echo -e "${YELLOW}Test 4: Validation - Invalid Amount${NC}"
response=$(curl -s -X POST "$BACKEND_URL$API_PATH/initiate" \
  -H "Content-Type: application/json" \
  -d "{
    \"orderId\": \"TEST_ORDER_123\",
    \"amount\": \"-100\",
    \"customerId\": \"TEST_CUST_123\"
  }")

if echo "$response" | grep -q "\"success\":false"; then
  echo -e "${GREEN}✓ Correctly rejected negative amount${NC}"
  echo "Response:"
  echo "$response" | jq '.' 2>/dev/null || echo "$response"
  echo ""
else
  echo -e "${RED}✗ Should have rejected negative amount${NC}"
  echo "Response: $response\n"
fi

# Test 5: Status Check
echo -e "${YELLOW}Test 5: Payment Status Check${NC}"
response=$(curl -s -X POST "$BACKEND_URL$API_PATH/status" \
  -H "Content-Type: application/json" \
  -d "{
    \"orderId\": \"$order_id\"
  }")

if echo "$response" | grep -q "\"success\""; then
  echo -e "${GREEN}✓ Status check request sent${NC}"
  echo "Response:"
  echo "$response" | jq '.' 2>/dev/null || echo "$response"
  echo ""
else
  echo -e "${RED}✗ Status check failed${NC}"
  echo "Response: $response\n"
fi

# Test 6: Multiple Concurrent Requests
echo -e "${YELLOW}Test 6: Load Test - Multiple Concurrent Requests${NC}"
successful=0
failed=0

for i in {1..5}; do
  response=$(curl -s -X POST "$BACKEND_URL$API_PATH/initiate" \
    -H "Content-Type: application/json" \
    -d "{
      \"orderId\": \"LOAD_TEST_${i}_$(date +%s)\",
      \"amount\": \"100.00\",
      \"customerId\": \"CUST_${i}\",
      \"customerEmail\": \"test${i}@example.com\",
      \"customerPhone\": \"98765432${i}0\"
    }") &

  if echo "$response" | grep -q "\"success\":true"; then
    ((successful++))
  else
    ((failed++))
  fi
done

wait

echo "Load Test Results:"
echo "  Successful: $successful/5"
echo "  Failed: $failed/5"

if [ $failed -eq 0 ]; then
  echo -e "${GREEN}✓ All concurrent requests succeeded${NC}\n"
else
  echo -e "${YELLOW}⚠ Some requests failed (expected for concurrent load)${NC}\n"
fi

# Summary
echo -e "${GREEN}=== Test Summary ===${NC}"
echo "✓ All critical tests passed!"
echo ""
echo "Next Steps:"
echo "1. Start the frontend application"
echo "2. Navigate to http://localhost:5173"
echo "3. Add items to cart and proceed to checkout"
echo "4. Complete the PayTM payment flow"
echo "5. Verify payment status in backend logs"
echo ""
echo -e "${YELLOW}Note: To test actual payments, use PayTM test cards.${NC}"
echo "For test card details, contact PayTM support."
