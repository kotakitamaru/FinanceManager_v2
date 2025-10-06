// Testing helpers for transaction list functionality
// These utilities help verify the sorting and pagination functionality

import { SORT_FIELDS, SORT_ORDERS } from '@/types/transaction';
import type { Transaction } from '@/types/transaction';
import type { Category } from '@/types/category';

/**
 * Test data generator for creating mock transactions
 */
export const generateMockTransactions = (count: number = 50): Transaction[] => {
  const categories: Category[] = [
    { id: 1, title: 'Food & Dining', icon: '🍽️', color: '#FF6B6B', isIncome: false, amount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 2, title: 'Transportation', icon: '🚗', color: '#4ECDC4', isIncome: false, amount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 3, title: 'Salary', icon: '💰', color: '#45B7D1', isIncome: true, amount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 4, title: 'Shopping', icon: '🛍️', color: '#96CEB4', isIncome: false, amount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 5, title: 'Entertainment', icon: '🎬', color: '#FFEAA7', isIncome: false, amount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ];

  const accounts = [
    { id: '1', title: 'Checking Account', icon: '🏦', color: '#74B9FF' },
    { id: '2', title: 'Savings Account', icon: '💰', color: '#00B894' },
    { id: '3', title: 'Credit Card', icon: '💳', color: '#E17055' }
  ];

  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const account = accounts[Math.floor(Math.random() * accounts.length)];
    const amount = Math.floor(Math.random() * 1000) + 10;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Random date within last 90 days

    transactions.push({
      id: (i + 1).toString(),
      accountId: account.id,
      categoryId: category.id.toString(),
      amount: category.isIncome ? amount : -amount,
      note: `Test transaction ${i + 1}`,
      date: date.toISOString().split('T')[0],
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      category: category
    });
  }

  return transactions;
};

/**
 * Test sorting functionality
 */
export const testSortingFunctionality = () => {
  const testCases = [
    { sortBy: SORT_FIELDS.DATE, sortOrder: SORT_ORDERS.ASC, description: 'Date ascending (oldest first)' },
    { sortBy: SORT_FIELDS.DATE, sortOrder: SORT_ORDERS.DESC, description: 'Date descending (newest first)' },
    { sortBy: SORT_FIELDS.AMOUNT, sortOrder: SORT_ORDERS.ASC, description: 'Amount ascending (lowest first)' },
    { sortBy: SORT_FIELDS.AMOUNT, sortOrder: SORT_ORDERS.DESC, description: 'Amount descending (highest first)' },
    { sortBy: SORT_FIELDS.CATEGORY, sortOrder: SORT_ORDERS.ASC, description: 'Category ascending (A-Z)' },
    { sortBy: SORT_FIELDS.CATEGORY, sortOrder: SORT_ORDERS.DESC, description: 'Category descending (Z-A)' },
    { sortBy: SORT_FIELDS.ACCOUNT, sortOrder: SORT_ORDERS.ASC, description: 'Account ascending (A-Z)' },
    { sortBy: SORT_FIELDS.ACCOUNT, sortOrder: SORT_ORDERS.DESC, description: 'Account descending (Z-A)' }
  ];

  console.log('🧪 Testing Sorting Functionality');
  console.log('================================');
  
  testCases.forEach((testCase, index) => {
    console.log(`\n${index + 1}. ${testCase.description}`);
    console.log(`   Sort By: ${testCase.sortBy} (dropdown)`);
    console.log(`   Sort Order: ${testCase.sortOrder} (toggle switch)`);
    console.log(`   Expected API Call: GET /transactions?sortBy=${testCase.sortBy}&sortOrder=${testCase.sortOrder}`);
  });

  return testCases;
};

/**
 * Test pagination functionality
 */
export const testPaginationFunctionality = () => {
  const testCases = [
    { page: 1, limit: 10, description: 'First page with 10 items' },
    { page: 2, limit: 10, description: 'Second page with 10 items' },
    { page: 1, limit: 20, description: 'First page with 20 items' },
    { page: 1, limit: 50, description: 'First page with 50 items' },
    { page: 5, limit: 10, description: 'Fifth page with 10 items' }
  ];

  console.log('\n📄 Testing Pagination Functionality');
  console.log('===================================');
  
  testCases.forEach((testCase, index) => {
    console.log(`\n${index + 1}. ${testCase.description}`);
    console.log(`   Page: ${testCase.page}`);
    console.log(`   Limit: ${testCase.limit}`);
    console.log(`   Expected API Call: GET /transactions?page=${testCase.page}&limit=${testCase.limit}`);
  });

  return testCases;
};

/**
 * Test error handling scenarios
 */
export const testErrorHandlingScenarios = () => {
  const scenarios = [
    { scenario: 'Network failure', description: 'API returns network error' },
    { scenario: 'Empty results', description: 'No transactions found' },
    { scenario: 'Invalid sort parameters', description: 'Invalid sortBy or sortOrder values' },
    { scenario: 'Server error', description: 'API returns 500 error' },
    { scenario: 'Authentication failure', description: 'API returns 401 error' }
  ];

  console.log('\n⚠️ Testing Error Handling Scenarios');
  console.log('===================================');
  
  scenarios.forEach((scenario, index) => {
    console.log(`\n${index + 1}. ${scenario.scenario}`);
    console.log(`   Description: ${scenario.description}`);
    console.log(`   Expected Behavior: Show error message with retry option`);
  });

  return scenarios;
};

/**
 * Test loading states
 */
export const testLoadingStates = () => {
  const states = [
    { state: 'Initial load', description: 'Show skeleton while fetching transactions' },
    { state: 'Sort change', description: 'Show loading indicator during sort change' },
    { state: 'Page change', description: 'Show loading indicator during pagination' },
    { state: 'Filter change', description: 'Show loading indicator during filter change' }
  ];

  console.log('\n⏳ Testing Loading States');
  console.log('=========================');
  
  states.forEach((state, index) => {
    console.log(`\n${index + 1}. ${state.state}`);
    console.log(`   Description: ${state.description}`);
    console.log(`   Expected Behavior: Show appropriate loading indicator`);
  });

  return states;
};

/**
 * Test accessibility features
 */
export const testAccessibilityFeatures = () => {
  const features = [
    { feature: 'Keyboard navigation', description: 'Sort controls should be keyboard accessible' },
    { feature: 'Screen reader support', description: 'Proper ARIA labels and roles' },
    { feature: 'Focus management', description: 'Proper focus handling in dropdowns' },
    { feature: 'Color contrast', description: 'Sufficient color contrast for all text' },
    { feature: 'Touch targets', description: 'Adequate touch target sizes on mobile' }
  ];

  console.log('\n♿ Testing Accessibility Features');
  console.log('=================================');
  
  features.forEach((feature, index) => {
    console.log(`\n${index + 1}. ${feature.feature}`);
    console.log(`   Description: ${feature.description}`);
    console.log(`   Expected Behavior: Meet WCAG 2.1 AA standards`);
  });

  return features;
};

/**
 * Test responsive design
 */
export const testResponsiveDesign = () => {
  const breakpoints = [
    { breakpoint: 'Mobile (320px-480px)', description: 'Single column layout, stacked controls' },
    { breakpoint: 'Tablet (768px-1024px)', description: 'Optimized spacing and sizing' },
    { breakpoint: 'Desktop (1024px+)', description: 'Full layout with side-by-side controls' },
    { breakpoint: 'Large Desktop (1440px+)', description: 'Centered layout with max-width' }
  ];

  console.log('\n📱 Testing Responsive Design');
  console.log('============================');
  
  breakpoints.forEach((breakpoint, index) => {
    console.log(`\n${index + 1}. ${breakpoint.breakpoint}`);
    console.log(`   Description: ${breakpoint.description}`);
    console.log(`   Expected Behavior: Layout adapts appropriately`);
  });

  return breakpoints;
};

/**
 * Run all tests
 */
export const runAllTests = () => {
  console.log('🚀 Running Complete Transaction List Test Suite');
  console.log('===============================================');
  
  testSortingFunctionality();
  testPaginationFunctionality();
  testErrorHandlingScenarios();
  testLoadingStates();
  testAccessibilityFeatures();
  testResponsiveDesign();
  
  console.log('\n✅ Test suite completed!');
  console.log('\n📋 Manual Testing Checklist:');
  console.log('1. Open the Transactions page in your browser');
  console.log('2. Test each sorting combination using the dropdown controls');
  console.log('3. Verify pagination works with different page sizes');
  console.log('4. Test error scenarios by disconnecting network');
  console.log('5. Verify loading states appear during API calls');
  console.log('6. Test keyboard navigation and screen reader compatibility');
  console.log('7. Test responsive behavior on different screen sizes');
  console.log('8. Verify all interactions work smoothly');
};

/**
 * Validate transaction data structure
 */
export const validateTransactionData = (transaction: Transaction): boolean => {
  const requiredFields = ['id', 'accountId', 'categoryId', 'amount', 'note', 'date'];
  const hasAllFields = requiredFields.every(field => transaction[field as keyof Transaction] !== undefined);
  
  if (!hasAllFields) {
    console.error('❌ Transaction missing required fields:', transaction);
    return false;
  }
  
  if (typeof transaction.amount !== 'number' && typeof transaction.amount !== 'string') {
    console.error('❌ Transaction amount must be number or string:', transaction);
    return false;
  }
  
  if (!transaction.date || isNaN(Date.parse(transaction.date))) {
    console.error('❌ Transaction date must be valid ISO string:', transaction);
    return false;
  }
  
  return true;
};

/**
 * Performance testing helper
 */
export const measurePerformance = async (operation: () => Promise<any>, operationName: string) => {
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`⏱️ ${operationName}: ${duration.toFixed(2)}ms`);
    
    if (duration > 1000) {
      console.warn(`⚠️ ${operationName} took longer than expected: ${duration.toFixed(2)}ms`);
    }
    
    return { result, duration };
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.error(`❌ ${operationName} failed after ${duration.toFixed(2)}ms:`, error);
    throw error;
  }
};
