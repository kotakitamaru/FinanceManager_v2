# AI Task Template

> **Instructions:** This template helps you create comprehensive task documents for AI-driven development. Fill out each section thoroughly to ensure the AI agent has all necessary context and can execute the task systematically.  
> **Example usage:** Create nav bar in the footer with Home, Accounts, Transactions and Stats buttons. All should navigate to the proper pages. Dont impleement the pages, just create <h1> with name in the <div>. When page is active button should be black. No borders. Icon with text below. Navbar should have grey border on top. Border radius on both navbar and buttons. Fotter should be fixed bottom 0. On pc it should be at the center of the creen on the bottom. Decide wich length should be max. Create component for navbar and separately for button. Do this in components/layout/navbar folder. Save task to .cursor/tasks folder.

---

## 1. Task Overview

### Task Title
**Title:** Footer Navigation Bar Implementation

### Goal Statement
**Goal:** Create a fixed bottom navigation bar with Home, Accounts, Transactions, and Stats buttons that navigate to respective pages. The navbar should have a modern design with icons and text, active state styling, and be properly centered on desktop screens.

---

## 2. Project Analysis & Current State

### Technology & Architecture
- **Frameworks & Versions:** React 19.1.1, React Router DOM 6.26.2
- **Language:** TypeScript 5.8.3 with strict mode
- **UI & Styling:** Tailwind CSS 4.1.14
- **Key Architectural Patterns:** Component-based architecture, React Router for navigation
- **Relevant Existing Components:** `components/layout/MainAppLayout.tsx`, `components/layout/Header.tsx`, `components/layout/NavBarFooter.tsx` (empty file)

### Current State
The project has a basic layout structure with a Header component and MainAppLayout. There's an empty NavBarFooter.tsx file that needs to be implemented. The project uses React Router for navigation and Tailwind CSS for styling. No footer navigation currently exists.

---

## 3. Context & Problem Definition

### Problem Statement
The application lacks a bottom navigation bar for easy access to main sections (Home, Accounts, Transactions, Stats), making navigation cumbersome for users, especially on mobile devices.

### Success Criteria
- [ ] **Criterion 1:** Footer navbar is fixed at bottom of screen with proper centering on desktop
- [ ] **Criterion 2:** Four navigation buttons (Home, Accounts, Transactions, Stats) with icons and text
- [ ] **Criterion 3:** Active page button displays in black with no borders
- [ ] **Criterion 4:** All buttons navigate to respective pages with proper routing
- [ ] **Criterion 5:** Navbar has grey border on top and border radius styling
- [ ] **Criterion 6:** Components are properly organized in `components/layout/navbar/` folder

---

## 4. Technical Requirements

### Functional Requirements
- **Requirement 1:** Create reusable NavButton component with icon and text
- **Requirement 2:** Create FooterNavbar component that uses NavButton components
- **Requirement 3:** Implement React Router navigation for all four sections
- **Requirement 4:** Add active state styling (black background, no borders)
- **Requirement 5:** Create placeholder pages with h1 titles for each section

### Non-Functional Requirements
- **Performance:** Navbar should render quickly and not impact page load times
- **Responsiveness:** Should work well on both mobile and desktop screens
- **Accessibility:** Proper ARIA labels and keyboard navigation support

### Technical Constraints
- **Constraint 1:** Must use existing Tailwind CSS classes for styling
- **Constraint 2:** Must integrate with existing React Router setup
- **Constraint 3:** Must maintain existing layout structure
- **Constraint 4:** Must follow existing CSS pattern - create component-specific CSS files and import them directly into components (like `./Auth.css`)

---

## 5. Data & Database Changes

### Data Model Updates
- **No database changes required** - This is a frontend-only implementation

### Database Schema Changes
- **No database changes required**

### Data Migration Plan
- **No data migration required**

---

## 6. API & Backend Changes

### Data Access Pattern
- **No backend changes required** - This is a frontend-only implementation

### Business Logic / Server Actions
- **No backend changes required**

### Database Queries
- **No backend changes required**

### API Routes
- **No backend changes required**

---

## 7. Frontend Changes

### New Components
- **`components/layout/navbar/NavButton.tsx`:** Reusable button component with icon and text
- **`components/layout/navbar/NavButton.css`:** Styles for NavButton component
- **`components/layout/navbar/FooterNavbar.tsx`:** Main footer navigation component
- **`components/layout/navbar/FooterNavbar.css`:** Styles for FooterNavbar component
- **`pages/Accounts.tsx`:** Placeholder page for Accounts section
- **`pages/Transactions.tsx`:** Placeholder page for Transactions section
- **`pages/Stats.tsx`:** Placeholder page for Stats section

### Component Updates
- **`components/layout/MainAppLayout.tsx`:** Add FooterNavbar component
- **`components/routing/RouteHandler.tsx`:** Add new routes for the four sections

### Page Updates
- **`pages/Dashboard.tsx`:** Ensure it works as Home page
- **`pages/Accounts.tsx`:** Create new page with h1 "Accounts"
- **`pages/Transactions.tsx`:** Create new page with h1 "Transactions"
- **`pages/Stats.tsx`:** Create new page with h1 "Stats"

---

## 8. Implementation Plan

> **AI Agent Instructions:**  
> 1. Break the work into 3–5 logical phases (e.g., "Unit Tests", "Setup & Configuration", "Backend Implementation", "Frontend Implementation", "Integration & Testing").  
> 2. For each phase:  
>    - Provide a one-sentence **Goal** summarizing the phase's purpose.  
>    - List 3–6 discrete **Task** items as checkboxes.  
>    - Each task should reference specific files, functions, or components and describe exactly what to build or change.  
>    - Order tasks in the sequence they should be implemented and tested.

### Phase 1: Component Structure Setup
**Goal:** Create the basic component structure and folder organization for the navbar components.

- [ ] **Task 1.1:** Create `components/layout/navbar/` folder structure
- [ ] **Task 1.2:** Create `NavButton.tsx` component with props interface for icon, text, active state, and onClick
- [ ] **Task 1.3:** Create `NavButton.css` with component-specific styles
- [ ] **Task 1.4:** Create `FooterNavbar.tsx` component with basic structure and styling
- [ ] **Task 1.5:** Create `FooterNavbar.css` with component-specific styles
- [ ] **Task 1.6:** Add proper TypeScript interfaces for component props

### Phase 2: Page Creation and Routing
**Goal:** Create placeholder pages and set up routing for all four navigation sections.

- [ ] **Task 2.1:** Create `pages/Accounts.tsx` with h1 "Accounts" content
- [ ] **Task 2.2:** Create `pages/Transactions.tsx` with h1 "Transactions" content  
- [ ] **Task 2.3:** Create `pages/Stats.tsx` with h1 "Stats" content
- [ ] **Task 2.4:** Update `components/routing/RouteHandler.tsx` to include new routes
- [ ] **Task 2.5:** Ensure Dashboard page works as Home page

### Phase 3: Navbar Implementation
**Goal:** Implement the complete footer navbar with navigation functionality and styling.

- [ ] **Task 3.1:** Implement NavButton component with icon and text layout
- [ ] **Task 3.2:** Add active state styling (black background, no borders) to NavButton.css
- [ ] **Task 3.3:** Implement FooterNavbar with four navigation buttons
- [ ] **Task 3.4:** Add grey border on top and border radius styling to FooterNavbar.css
- [ ] **Task 3.5:** Implement React Router navigation for all buttons
- [ ] **Task 3.6:** Add responsive design for desktop centering and mobile layout in CSS files

### Phase 4: Integration and Styling
**Goal:** Integrate the navbar into the main layout and apply final styling touches.

- [ ] **Task 4.1:** Integrate FooterNavbar into MainAppLayout component
- [ ] **Task 4.2:** Apply fixed positioning (bottom: 0) and proper z-index in FooterNavbar.css
- [ ] **Task 4.3:** Add desktop centering with appropriate max-width in FooterNavbar.css
- [ ] **Task 4.4:** Test navigation between all pages and active state updates
- [ ] **Task 4.5:** Add proper spacing and padding for visual balance in CSS files
- [ ] **Task 4.6:** Ensure navbar doesn't overlap with main content

### Phase 5: Testing and Refinement
**Goal:** Test the implementation and make final adjustments for optimal user experience.

- [ ] **Task 5.1:** Test navigation functionality across all pages
- [ ] **Task 5.2:** Verify active state updates correctly when navigating
- [ ] **Task 5.3:** Test responsive behavior on different screen sizes
- [ ] **Task 5.4:** Verify accessibility with keyboard navigation
- [ ] **Task 5.5:** Check for any layout issues or overlapping content
- [ ] **Task 5.6:** Final styling adjustments and polish in CSS files
