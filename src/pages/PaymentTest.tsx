import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface TestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  data?: any;
}

export default function PaymentTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [formData, setFormData] = useState({
    orderId: `TEST_${Date.now()}`,
    amount: '100.00',
    customerId: `CUST_${Date.now()}`,
    email: 'test@example.com',
    phone: '9876543210'
  });

  const addResult = (result: TestResult) => {
    setResults(prev => [result, ...prev]);
  };

  const testHealthCheck = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/payment/health`);
      const data = await response.json();

      addResult({
        endpoint: 'GET /api/payment/health',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? 'Health check passed' : 'Health check failed',
        data
      });
    } catch (error) {
      addResult({
        endpoint: 'GET /api/payment/health',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testPaymentInitiation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: formData.orderId,
          amount: formData.amount,
          customerId: formData.customerId,
          customerEmail: formData.email,
          customerPhone: formData.phone
        })
      });

      const data = await response.json();

      addResult({
        endpoint: 'POST /api/payment/initiate',
        status: data.success ? 'success' : 'error',
        message: data.success ? 'Payment initiation successful' : data.message,
        data: data.success ? { orderId: data.data.orderId, hasPaytmParams: !!data.data.paytmParams } : data
      });
    } catch (error) {
      addResult({
        endpoint: 'POST /api/payment/initiate',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testPaymentStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/payment/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: formData.orderId })
      });

      const data = await response.json();

      addResult({
        endpoint: 'POST /api/payment/status',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? 'Status check completed' : 'Status check failed',
        data: data
      });
    } catch (error) {
      addResult({
        endpoint: 'POST /api/payment/status',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">PayTM Payment Integration Test</h1>
        <p className="text-muted-foreground">Test backend payment endpoints and configuration</p>
      </div>

      {/* Test Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Order ID</label>
              <Input
                value={formData.orderId}
                onChange={(e) => setFormData({...formData, orderId: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Amount (₹)</label>
              <Input
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Customer ID</label>
              <Input
                value={formData.customerId}
                onChange={(e) => setFormData({...formData, customerId: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                type="email"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Buttons */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Available Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={testHealthCheck}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Test Health Check
          </Button>
          <Button
            onClick={testPaymentInitiation}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Test Payment Initiation
          </Button>
          <Button
            onClick={testPaymentStatus}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Test Payment Status
          </Button>
          <Button
            onClick={() => setResults([])}
            disabled={isLoading || results.length === 0}
            className="w-full"
            variant="ghost"
          >
            Clear Results
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Test Results ({results.length})</h3>
        {results.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Run a test to see results here
            </CardContent>
          </Card>
        ) : (
          results.map((result, idx) => (
            <Card key={idx} className={
              result.status === 'success' ? 'border-success/50 bg-success/5' :
              result.status === 'error' ? 'border-destructive/50 bg-destructive/5' :
              ''
            }>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.status === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
                    {result.status === 'error' && <XCircle className="w-5 h-5 text-destructive" />}
                    {result.status === 'pending' && <AlertCircle className="w-5 h-5 text-warning" />}
                    <span className="font-mono text-sm font-medium">{result.endpoint}</span>
                  </div>
                  <Badge variant={
                    result.status === 'success' ? 'default' :
                    result.status === 'error' ? 'destructive' :
                    'secondary'
                  }>
                    {result.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{result.message}</p>
                {result.data && (
                  <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-48">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Backend Status */}
      <Card className="mt-6 bg-info/5 border-info/20">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Backend URL:</strong> {BACKEND_URL}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Make sure the backend server is running before testing. Use `npm run dev` in the backend directory.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
