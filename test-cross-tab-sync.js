// Cross-Tab Sync Test Script
// Run this in the browser console to test cross-tab synchronization

console.log('=== Cross-Tab Sync Test ===');

// Test 1: Check if storage event listener is set up
console.log('1. Checking storage event listener setup...');
if (typeof window !== 'undefined' && window.addEventListener) {
  console.log('✅ Window and addEventListener available');
  
  // Check if we can access localStorage
  try {
    localStorage.setItem('test-sync-check', 'test');
    localStorage.removeItem('test-sync-check');
    console.log('✅ localStorage is accessible');
  } catch (e) {
    console.log('❌ localStorage not accessible:', e);
  }
} else {
  console.log('❌ Window or addEventListener not available');
}

// Test 2: Check current auth data
console.log('\n2. Checking current authentication data...');
try {
  const authData = localStorage.getItem('anhd-dap-portal--user');
  if (authData) {
    const parsed = JSON.parse(authData);
    console.log('✅ Auth data found:', {
      hasAccess: !!parsed.access,
      hasRefresh: !!parsed.refresh,
      hasUser: !!parsed.user,
      accessExpiration: parsed.access?.expiration || 'N/A'
    });
  } else {
    console.log('ℹ️ No auth data found (user not logged in)');
  }
} catch (e) {
  console.log('❌ Error reading auth data:', e);
}

// Test 3: Check if storage event listener is actually attached
console.log('\n3. Checking storage event listener attachment...');
let storageEventDetected = false;
let testListenerAdded = false;

// Add our own test listener to see if storage events work at all
const testStorageListener = (event) => {
  console.log('🎯 TEST: Storage event detected by our test listener:', {
    key: event.key,
    oldValue: event.oldValue ? 'exists' : 'null',
    newValue: event.newValue ? 'exists' : 'null'
  });
  storageEventDetected = true;
};

try {
  window.addEventListener('storage', testStorageListener);
  testListenerAdded = true;
  console.log('✅ Test storage event listener added');
} catch (e) {
  console.log('❌ Error adding test storage listener:', e);
}

// Test 4: Manual storage event test with better debugging
console.log('\n4. Manual storage event test...');
console.log('Running manual storage event test in 3 seconds...');
setTimeout(() => {
  try {
    console.log('🔄 Triggering manual storage event...');
    const testData = { test: Date.now(), manual: true };
    const oldValue = localStorage.getItem('anhd-dap-portal--user');
    localStorage.setItem('anhd-dap-portal--user', JSON.stringify(testData));
    console.log('✅ Manual storage event triggered');
    console.log('Old value:', oldValue ? 'exists' : 'null');
    console.log('New value: exists');
    
    // Check if our test listener detected the event
    setTimeout(() => {
      if (storageEventDetected) {
        console.log('✅ Storage event was detected by our test listener!');
      } else {
        console.log('❌ Storage event was NOT detected by our test listener');
        console.log('This suggests the storage event listener is not working properly');
      }
      
      // Clean up test listener
      if (testListenerAdded) {
        window.removeEventListener('storage', testStorageListener);
        console.log('🧹 Test storage listener removed');
      }
    }, 1000);
    
  } catch (e) {
    console.log('❌ Error triggering manual storage event:', e);
  }
}, 3000);

// Test 5: Check if the app's storage event listener is working
console.log('\n5. Checking app storage event listener...');
console.log('If you see storage event messages (🔄, 📡, ✅) above, the app listener is working');
console.log('If you only see our test listener messages (🎯), there may be an issue with the app listener');

console.log('\n=== Test Complete ===');
console.log('Watch for storage event messages above to verify cross-tab sync is working!'); 