# AI Task Template

> **Instructions:** This template helps you create comprehensive task documents for AI-driven development. Fill out each section thoroughly to ensure the AI agent has all necessary context and can execute the task systematically.  
> **Example usage:** Create a card for Account. It should have an account color somewhere (border, text, you decide) and icon. Card should be horizontal. Amount on an account should be presented. This card should work as button. Do nothing on click as placeholder. Make cursor pointer, however an focus effects. Make list of these cards appear on accounts page. Card should be in a components/accounts folder. Fetch accounts from backend to list them
> **Example Implementation** Implement Phase # tasks, and update the file when each task is completed.


---

## 1. Task Overview

### Task Title
**Title:** Account Card Component Implementation

### Goal Statement
**Goal:** Create a horizontal account card component that displays account information (name, icon, color, balance) and integrates with the backend API to fetch and display accounts on the Accounts page. The card should be interactive with proper hover/focus states and serve as a clickable button placeholder.

---

## 2. Project Analysis & Current State

### Technology & Architecture
- **Frameworks & Versions:** React 18+ with TypeScript, Vite build tool
- **Language:** TypeScript with strict mode enabled
- **Database & ORM:** Node.js/Express backend with TypeORM
- **UI & Styling:** CSS modules for component styling
- **Authentication:** JWT-based authentication with Bearer tokens
- **Key Architectural Patterns:** Component-based architecture, service layer pattern for API calls
- **Relevant Existing Components:** `Button.tsx`, `Input.tsx`, `LoadingSpinner.tsx`, `FooterNavbar.tsx`

### Current State
The project has a basic Accounts page (`FinanceManager.UI/src/pages/Accounts.tsx`) that currently only displays a heading. The backend has a complete Account API with CRUD operations (`/accounts` endpoint) that returns account data including `id`, `title`, `icon`, `color`, `createDate`, and `updateDate`. The frontend has proper TypeScript types defined for accounts and a working API service layer. The project uses CSS modules for styling and has a consistent component structure.

---

## 3. Context & Problem Definition

### Problem Statement
The Accounts page currently lacks any visual representation of accounts. Users cannot see their accounts in a meaningful way, and there's no way to interact with individual accounts. The page needs a card-based interface to display account information with proper visual hierarchy and interactivity.

### Success Criteria
- [ ] **Criterion 1:** Account cards display all relevant account information (title, icon, color, balance)
- [ ] **Criterion 2:** Cards are horizontally oriented with proper visual hierarchy
- [ ] **Criterion 3:** Cards are clickable with proper hover/focus states and cursor pointer
- [ ] **Criterion 4:** Account data is fetched from backend API and displayed in a list
- [ ] **Criterion 5:** Cards are properly styled with account colors (border or text)
- [ ] **Criterion 6:** Component is organized in `components/accounts` folder structure

---

## 4. Technical Requirements

### Functional Requirements
- **Requirement 1:** Create `AccountCard` component with horizontal layout
- **Requirement 2:** Display account title, icon, color, and balance information
- **Requirement 3:** Implement clickable behavior with placeholder functionality
- **Requirement 4:** Fetch accounts from `/accounts` API endpoint
- **Requirement 5:** Display list of account cards on Accounts page
- **Requirement 6:** Apply account color styling (border or text color)

### Non-Functional Requirements
- **Performance:** Cards should render smoothly with proper loading states
- **Accessibility:** Proper focus states and keyboard navigation support
- **Responsiveness:** Cards should work on different screen sizes
- **Security:** API calls must include proper authentication headers

### Technical Constraints
- **Constraint 1:** Must use existing CSS modules pattern for styling
- **Constraint 2:** Must integrate with existing API service layer
- **Constraint 3:** Must follow existing TypeScript type definitions
- **Constraint 4:** Must maintain consistency with existing component patterns

---

## 5. Data & Database Changes

### Data Model Updates
- **Updated Entities:** Add `balance` field to `AccountResponse` DTO (calculated field, not stored in DB)
- **New Calculation Logic:** Balance = SUM(transactions.amount * CASE WHEN categories.is_income = true THEN 1 ELSE -1 END)

### Database Schema Changes
- **No schema changes required** - balance is calculated dynamically in queries

### Data Migration Plan
- **No data migration required** - balance calculation will be implemented in SQL queries

---

## 6. API & Backend Changes

### Data Access Pattern
- **Queries:** Use existing `apiService.get('/accounts')` method with updated balance calculation
- **Mutations:** No mutations required for this task

### Business Logic / Server Actions
- **Updated AccountService:** Modify `getAccounts()` and `getAccountById()` to include balance calculation
- **Updated AccountRepository:** Add balance calculation to SQL queries using JOIN with transactions and categories

### Database Queries
- **Updated Queries:** Modify `findAll()` and `findById()` to include balance calculation via SQL aggregation
- **Balance Calculation Query:** 
  ```sql
  COALESCE(SUM(t.amount * CASE WHEN c.is_income = true THEN 1 ELSE -1 END), 0) as balance
  FROM accounts a
  LEFT JOIN transactions t ON a.id = t.account_id
  LEFT JOIN categories c ON t.category_id = c.id
  ```
- **Query Structure:** Use LEFT JOIN to include accounts with no transactions (balance = 0)

### API Routes
- **Using existing routes:** `GET /accounts` endpoint (will return accounts with calculated balance)

---

## 7. Frontend Changes

### New Components
- **`components/accounts/AccountCard.tsx`:** Horizontal card component displaying account info
- **`components/accounts/AccountCard.css`:** Styling for the account card
- **`components/accounts/AccountList.tsx`:** Container component for displaying list of account cards
- **`components/accounts/index.ts`:** Export file for account components

### Component Updates
- **`pages/Accounts.tsx`:** Integrate AccountList component and fetch accounts data
- **`types/account.ts`:** Update Account interface to include balance field from backend response

### Page Updates
- **`pages/Accounts.tsx`:** Replace static content with dynamic account list

---

## 8. Implementation Plan

> **AI Agent Instructions:**  
> 1. Break the work into 3–5 logical phases (e.g., "Unit Tests", "Setup & Configuration", "Backend Implementation", "Frontend Implementation", "Integration & Testing").  
> 2. For each phase:  
>    - Provide a one-sentence **Goal** summarizing the phase's purpose.  
>    - List 3–6 discrete **Task** items as checkboxes.  
>    - Each task should reference specific files, functions, or components and describe exactly what to build or change.  
>    - Order tasks in the sequence they should be implemented and tested.

### Phase 1: Backend Balance Calculation Implementation
**Goal:** Implement balance calculation in the backend API to return calculated balance with account data.

- [ ] **Task 1.1:** Update `types/AccountTypes.ts` to add balance field to AccountResponse DTO
- [ ] **Task 1.2:** Modify `AccountRepository.findAll()` to include balance calculation via SQL JOIN
- [ ] **Task 1.3:** Modify `AccountRepository.findById()` to include balance calculation via SQL JOIN
- [ ] **Task 1.4:** Test balance calculation with sample data to ensure correct income/expense logic
- [ ] **Task 1.5:** Verify API endpoints return accounts with calculated balance

### Phase 2: Frontend Type Updates & Setup
**Goal:** Update frontend types and create component folder structure to match backend changes.

- [ ] **Task 2.1:** Update `types/account.ts` to include balance field and ensure compatibility with backend AccountResponse
- [ ] **Task 2.2:** Create `components/accounts/` folder structure
- [ ] **Task 2.3:** Create `components/accounts/index.ts` export file
- [ ] **Task 2.4:** Verify API service can fetch accounts data with balance correctly

### Phase 3: Account Card Component Implementation
**Goal:** Create the core AccountCard component with proper styling and interactivity.

- [ ] **Task 3.1:** Create `AccountCard.tsx` component with horizontal layout structure
- [ ] **Task 3.2:** Create `AccountCard.css` with styling for horizontal card, color theming, and hover/focus states
- [ ] **Task 3.3:** Implement click handler placeholder functionality
- [ ] **Task 3.4:** Add proper TypeScript props interface for AccountCard
- [ ] **Task 3.5:** Implement account color styling (border or text color based on account.color)
- [ ] **Task 3.6:** Display account balance with proper formatting

### Phase 4: Account List Component Implementation
**Goal:** Create the container component that manages the list of account cards.

- [ ] **Task 4.1:** Create `AccountList.tsx` component to render multiple AccountCard components
- [ ] **Task 4.2:** Implement loading state handling for account data fetching
- [ ] **Task 4.3:** Add error handling for failed API requests
- [ ] **Task 4.4:** Implement proper TypeScript interfaces for AccountList props

### Phase 5: Integration & Page Updates
**Goal:** Integrate the account components with the Accounts page and ensure proper data flow.

- [ ] **Task 5.1:** Update `pages/Accounts.tsx` to use AccountList component
- [ ] **Task 5.2:** Implement data fetching logic using existing API service
- [ ] **Task 5.3:** Add proper error handling and loading states to Accounts page
- [ ] **Task 5.4:** Test complete flow from API to UI display

### Phase 6: Styling & Polish
**Goal:** Ensure consistent styling and proper responsive behavior.

- [ ] **Task 6.1:** Review and refine AccountCard styling for consistency with existing components
- [ ] **Task 6.2:** Ensure proper responsive behavior on different screen sizes
- [ ] **Task 6.3:** Verify accessibility features (focus states, keyboard navigation)
- [ ] **Task 6.4:** Test hover and focus effects work correctly
