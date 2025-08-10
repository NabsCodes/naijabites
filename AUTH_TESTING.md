# Authentication Testing Guide

This guide explains how to test the authentication functionality in the Naijabites app.

## 🧪 Testing Methods

### 1. Test Page (Recommended)
Visit `/test-auth` in your browser to access the interactive test page.

**Features:**
- Real-time status monitoring
- Login form with error handling
- Customer data display
- Debug information
- Manual logout functionality

### 2. Browser Console Testing
Load the test script and run commands in the browser console.

**Setup:**
1. Open browser console (F12)
2. Copy and paste the contents of `src/lib/test-auth.js`
3. Use the test functions

**Available Commands:**
```javascript
// Run complete test
testAuth.runFullTest('your-email@example.com', 'your-password')

// Test individual components
testAuth.testLogin('email', 'password')
testAuth.testCustomerData()
testAuth.checkCustomerData()

// Clear all data
testAuth.clearAll()
```

### 3. Manual Testing
Test the authentication flow manually:

1. **Login Test:**
   - Go to `/login`
   - Enter valid credentials
   - Check if redirected to home page
   - Verify header shows user information

2. **Signup Test:**
   - Go to `/signup`
   - Complete registration process
   - Verify automatic login after signup
   - Check customer data is displayed

3. **Logout Test:**
   - Click logout in header
   - Verify redirected to home page
   - Check header shows login/signup buttons

## 🔍 What to Test

### Authentication Flow
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error handling)
- [ ] Signup with valid information
- [ ] Signup with invalid information (error handling)
- [ ] Logout functionality
- [ ] Token persistence across page refreshes

### Customer Data
- [ ] Customer data fetched after login
- [ ] Customer data stored in localStorage
- [ ] Customer name displayed in header
- [ ] Customer initials shown in avatar
- [ ] Customer email displayed in dropdown

### Security
- [ ] Token stored in HTTP-only cookies
- [ ] Customer data cleared on logout
- [ ] Token cleared on logout
- [ ] Secure cookie settings (HTTPS, sameSite)

### Error Handling
- [ ] Network errors during login
- [ ] Invalid token handling
- [ ] Missing customer data handling
- [ ] API error responses

## 🐛 Debugging

### Check Auth State
```javascript
// In browser console
debugAuthState()
```

### Check Storage
```javascript
// Check cookies
console.log(document.cookie)

// Check localStorage
console.log(localStorage.getItem('customer_data'))
```

### Common Issues

1. **Token not saved:**
   - Check if cookies are enabled
   - Verify HTTPS is being used (for secure cookies)
   - Check browser console for errors

2. **Customer data not fetched:**
   - Verify token is present
   - Check network tab for API calls
   - Verify Shopify API credentials

3. **Header not updating:**
   - Check if component is re-rendering
   - Verify localStorage data is present
   - Check for JavaScript errors

## 📝 Test Data

Use these test credentials (replace with actual test accounts):

```javascript
// Test login
testAuth.runFullTest('test@example.com', 'password123')

// Test signup
// Use the signup form with a new email address
```

## 🚀 Production Testing

Before deploying to production:

1. Test with real Shopify store credentials
2. Verify all environment variables are set
3. Test on different browsers
4. Test on mobile devices
5. Verify HTTPS requirements for secure cookies

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify API endpoints are working
3. Check Shopify API credentials
4. Review network tab for failed requests
5. Test with the debug utilities provided 