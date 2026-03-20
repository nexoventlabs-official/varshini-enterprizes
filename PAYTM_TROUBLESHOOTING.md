# PayTM Script Loading - Complete Troubleshooting Guide

## ⚠️ Issue: "Failed to load PayTM script"

This error means the PayTM checkout script from `https://securegw.paytm.in/paytnx/js/checkout.js` is not loading.

---

## 🔍 Step 1: Test Script Loading in Isolation

**Before testing payment flow, verify the script can load:**

1. Download this file: `PAYTM_SCRIPT_TEST.html`
2. Open it in your browser (can work offline with local file)
3. Click "🚀 Test PayTM Script Load"
4. Check console (F12) for detailed logs

**Expected Output:**
```
✅ Script tag onload event fired
✅ Paytm.CheckoutJS.invoke available
✅ PayTM is fully loaded and ready!
```

---

## 🐛 Common Causes & Solutions

### 1. **CSP (Content Security Policy) Blocking**

**Error Sign:**
- Script load fails silently
- Browser console shows CSP violation
- Network tab shows script request blocked

**Fix Applied:**
✅ Updated `index.html` with CSP meta tag allowing:
- `https://securegw.paytm.in`
- `https://secure.paytmpayments.com`

**Verify Fix:**
```
1. Press F12 → Console tab
2. Run: document.querySelector('meta[http-equiv="Content-Security-Policy"]')
3. Should NOT return null
```

---

### 2. **Network/Connectivity Issues**

**Error Sign:**
- Script load timeout (15 seconds)
- Network tab shows failed request
- No response from PayTM CDN

**Troubleshooting Steps:**
```
1. Test connectivity:
   curl https://securegw.paytm.in/paytnx/js/checkout.js

2. Should return JavaScript code (not error)

3. Check network tab in F12:
   - No request? → CORS or redirect issue
   - 404? → PayTM URL changed
   - BLOCKED? → CSP or browser extension
```

**Solutions:**
- [ ] Disable VPN/proxy
- [ ] Disable browser extensions (especially ad blockers)
- [ ] Try different browser or incognito mode
- [ ] Check your internet connection

---

### 3. **CORS (Cross-Origin Request Blocking)**

**Error Sign:**
- "Cross-Origin Request Blocked"
- Script shows in Network tab with error
- Status code 0 or redirect

**Note:**
PayTM script doesn't need CORS headers because it's added via `<script>` tag (not XHR). If CORS appears in errors, it's likely a different issue.

---

### 4. **Browser Security Policies**

**Affected Browsers:**
- Older browsers might block external scripts
- Safari with "Prevent cross-site tracking"
- Chrome with strict extensions

**Solutions:**
```
1. Update browser to latest version
2. Disable tracking protection (temporarily)
3. Add exception for PayTM domain
4. Try incognito/private mode
```

---

## 🔧 Fixes Already Applied

✅ **Removed crossorigin attribute from script tag:**
- ISSUE: Adding `crossorigin="anonymous"` triggered CORS checks
- SOLUTION: Script tags load cross-origin by DEFAULT - no CORS headers needed
- This was causing: "Access-Control-Allow-Origin header is missing"

✅ **Updated index.html:**
```html
<!-- CSP allowing PayTM -->
<meta http-equiv="Content-Security-Policy" content="...script-src 'self' 'unsafe-inline' https://securegw.paytm.in ...">

<!-- Preconnect for faster loading -->
<link rel="preconnect" href="https://securegw.paytm.in" crossorigin>
<link rel="preconnect" href="https://secure.paytmpayments.com" crossorigin>
```

✅ **Enhanced PaymentModal.tsx & CheckoutModal.tsx:**
- Better error logging
- Timeout handling (15 seconds)
- Retry mechanism
- Script caching
- NO crossorigin attribute on script tag

---

## 🧪 Complete Testing Procedure

### Test 1: Script in Isolation
```
1. Open: PAYTM_SCRIPT_TEST.html
2. Click: "🚀 Test PayTM Script Load"
3. Expected: ✅ all steps succeed
```

**If Test 1 FAILS:**
→ Network/CSP issue - skip to debugging below

### Test 2: Script in Frontend
```
1. Go to: https://varshini-enterprizes.vercel.app
2. Add product, click Checkout
3. Fill address, select PayTM
4. Click "Proceed to Payment"
5. Expected: ✅ PayTM modal opens
```

**If Test 2 FAILS, but Test 1 PASSED:**
→ Frontend issue - check browser console (F12)

---

## 🔍 Debugging in Browser Console

### Get Detailed Information:

```javascript
// Check PayTM object
console.log('Paytm:', window.Paytm);
console.log('CheckoutJS:', window.Paytm?.CheckoutJS);
console.log('invoke:', window.Paytm?.CheckoutJS?.invoke);

// Check script in DOM
console.log('Script exists:', !!document.querySelector('script[src*="checkout.js"]'));

// Check CSP
console.log('CSP meta tag:', document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content);
```

### Expected Output:
```
Paytm: {CheckoutJS: {invoke: ƒ}}  ✅
CheckoutJS: {invoke: ƒ}  ✅
invoke: ƒ invoke() { ... }  ✅
Script exists: true  ✅
CSP meta tag: "default-src 'self' https:; ..."  ✅
```

---

## 📊 Network Tab Analysis

1. **Press F12 → Network tab**
2. **Reload page (F5)**
3. **Add product and proceed to payment**
4. **Look for request to:**
   - `securegw.paytm.in` or `paytnx/js/checkout.js`

**Expected:**
- Status: 200 ✅
- Type: script or fetch
- Size: > 50KB
- Time: < 2 seconds

**If Status is NOT 200:**
- **304**: Cached - OK ✅
- **0**: Blocked by browser - check CSP and extensions
- **404**: URL changed - contact support
- **50x**: PayTM server down - wait and retry

---

## 🚀 Step-by-Step Fix Guide

### If script loading fails:

**Step 1: Clear Browser Cache**
```
Chrome: Ctrl+Shift+Delete → Clear browsing data
Firefox: Ctrl+Shift+Delete → Select all, Clear now
Safari: Develop → Empty Web Caches
```

**Step 2: Disable Extensions**
```
1. Open browser extensions
2. Disable all extensions temporarily
3. Reload page and test
4. Re-enable extensions one by one to find culprit
```

**Step 3: Try Incognito Mode**
```
Chrome: Ctrl+Shift+N
Firefox: Ctrl+Shift+P
Safari: Cmd+Shift+N

- If works in incognito → extension/cache issue
- If fails in incognito → network/CSP issue
```

**Step 4: Check DevTools Console**
```
1. Press F12
2. Go to Console tab
3. Run each command from "Get Detailed Information" section
4. Note any errors
5. Share errors for support
```

**Step 5: Update Frontend Code**
```
1. Latest fixes pushed to GitHub
2. Vercel auto-deploys (may take 5-10 minutes)
3. Hard refresh: Ctrl+F5 (or Cmd+Shift+R on Mac)
4. Clear browser cache if needed
```

---

## 📱 Mobile Testing

**If payment works on desktop but NOT mobile:**

```
1. Open DevTools on mobile (Android Chrome):
   - Connect to computer via USB
   - Visit: chrome://inspect

2. Or use mobile browser console:
   - Safari iOS: Settings → Safari → Advanced → Web Inspector
   - Chrome Android: Default console in DevTools

3. Look for same errors as desktop
```

---

## 🆘 Advanced Debugging

### Monitor Script Load Events:

```javascript
// Add this to browser console before testing payment
window.addEventListener('error', (event) => {
  if (event.filename?.includes('paytm')) {
    console.error('PayTM Error:', {
      filename: event.filename,
      message: event.message,
      lineno: event.lineno,
      colno: event.colno
    });
  }
});
```

### Check CSP Violations:

```javascript
// Listen to CSP violations
document.addEventListener('securitypolicyviolation', (event) => {
  console.error('CSP Violation:', {
    blockedURI: event.blockedURI,
    directive: event.violatedDirective,
    originalPolicy: event.originalPolicy,
    sourceFile: event.sourceFile,
    lineNumber: event.lineNumber
  });
});
```

---

## 📞 Support Information

If script still won't load after all steps:

**Provide This Information:**
1. Browser and version: (e.g., Chrome 120)
2. Operating system: (e.g., Windows 11)
3. Console errors: (from F12)
4. Network errors: (from Network tab)
5. CSP and Paytm object status: (from debugging commands)
6. Test HTML result: (pass/fail)

**Contact:**
- Check PayTM status page: https://www.paytmpayments.com/status
- Try PayTM test account: Use different merchant credentials

---

## ✅ Verification Checklist

After applying fixes:

- [ ] Test 1 (PAYTM_SCRIPT_TEST.html) passes
- [ ] No CSP errors in console
- [ ] No CORS errors in console
- [ ] Script loads in Network tab (status 200 or 304)
- [ ] window.Paytm is defined
- [ ] window.Paytm.CheckoutJS.invoke exists
- [ ] Test 2 (Full payment flow) works
- [ ] Same behavior on mobile

---

## 🎯 If Everything Fails

**Nuclear Option (Last Resort):**
1. Hard refresh: `Ctrl+Shift+Delete` then `Ctrl+Shift+R`
2. Close all browser tabs running the site
3. Completely close and restart browser
4. Wait 5 minutes for Vercel to re-deploy latest code
5. Try again with fresh browser instance

If still failing after this, there's likely a PayTM service issue or payment account configuration issue.

