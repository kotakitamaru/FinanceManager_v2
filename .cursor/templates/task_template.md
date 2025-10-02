# AI Task Template

> **Instructions:** This template helps you create comprehensive task documents for AI-driven development. Fill out each section thoroughly to ensure the AI agent has all necessary context and can execute the task systematically.  
> **Example usage:** <!--description of task-->  Use `@ai_docs/templates/task_template.md` as a template and modify it to explain all changes that are necessary to complete this task.  Do not make any code changes, create a new Task document first so I can review it
> **Example Implementation** Implement Phase # tasks, and update the file when each task is completed.


---

## 1. Task Overview

### Task Title
<!-- Provide a clear, specific title for this task -->
**Title:** [Brief, descriptive title of what you’re building or fixing]

### Goal Statement
<!-- One paragraph describing the high-level objective -->
**Goal:** [Clear statement of what you want to achieve and why it matters]

---

## 2. Project Analysis & Current State

### Technology & Architecture
<!--
AI Agent: Analyze the project to fill this out.
- Check `package.json` for versions and dependencies.
- Check `tsconfig.json` for TypeScript configuration.
- Check `tailwind.config.ts` for styling and theme.
- Check `drizzle/schema/` for database schema.
- Check `middleware.ts` for authentication and routing.
- Check `components/` for existing UI patterns.
-->
- **Frameworks & Versions:** [e.g., Next.js x.y, React x.y]  
- **Language:** [e.g., TypeScript x.y with strict mode]  
- **Database & ORM:** [e.g., Postgres via Drizzle ORM]  
- **UI & Styling:** [e.g., shadcn/ui + Tailwind CSS]  
- **Authentication:** [e.g., Supabase Auth in `middleware.ts`]  
- **Key Architectural Patterns:** [e.g., App Router, Server Components, Server Actions]  
- **Relevant Existing Components:** [e.g., `components/ui/Button.tsx`, `components/LoginForm.tsx`]

### Current State
<!-- Describe what exists today based on actual analysis -->
[Summarize what code/components/features are already in place, what’s working, and any known gaps or issues]

---

## 3. Context & Problem Definition

### Problem Statement
<!-- Describe the current problem and why it needs to be addressed -->
[One or two sentences outlining the pain point or bug]

### Success Criteria
<!-- Define measurable outcomes that indicate the task is complete -->
- [ ] **Criterion 1:** [e.g., “User can successfully submit the form without errors”]  
- [ ] **Criterion 2:** [e.g., “Page loads within 500 ms under load”]

---

## 4. Technical Requirements

### Functional Requirements
<!-- List specific features or behaviors the solution must support -->
- **Requirement 1:** [e.g., “Add CRUD operations for AI models”]  
- **Requirement 2:** [e.g., “Display realtime status updates in the UI”]

### Non-Functional Requirements
<!-- List performance, security, scalability, etc. -->
- **Performance:** [e.g., “API response ≤200 ms at 100 req/s”]  
- **Scalability:** [e.g., “Support up to 10 k concurrent users”]  
- **Security:** [e.g., “All endpoints must require JWT auth”]

### Technical Constraints
<!-- Any limitations you must work within -->
- **Constraint 1:** [e.g., “Cannot add CASCADE deletes to legacy tables”]  
- **Constraint 2:** [e.g., “Must remain compatible with v1 of the public API”]

---

## 5. Data & Database Changes

### Data Model Updates
<!-- Define any new or updated entities/data structures -->
- **New Entities:** [e.g., `AIModel`, `ModelVersion`]  
- **Updated Entities:** [e.g., add `status` field to `User`]

### Database Schema Changes
<!-- Describe required migrations -->
- [ ] **Migration 1:** [e.g., “Create `ai_models` table with columns id, name, created_at”]  
- [ ] **Migration 2:** [e.g., “Add index on `model_id` in `model_versions`”]

### Data Migration Plan
<!-- Steps to move or transform existing data -->
- [ ] [Write script to backfill `status` for existing users]  
- [ ] [Run migration in staging, verify integrity, then deploy to production]

---

## 6. API & Backend Changes

### Data Access Pattern
<!-- Describe how data will be fetched and mutated -->
- **Queries:** [e.g., “`getAIModels()` in `lib/aiModel.ts`”]  
- **Mutations:** [e.g., “Server Actions in `app/actions/aiModel.ts`”]

### Business Logic / Server Actions
<!-- Outline new or updated functions/endpoints -->
- **`createModel(name: string)`:** [Creates a new AI model record]  
- **`updateModelStatus(id: string, status: string)`:** [Updates model lifecycle state]

### Database Queries
<!-- Detail any repository / raw‐SQL operations -->
- **`selectAllModels()`:** [Returns all models ordered by creation date]  
- **`deleteModelById(id)`:** [Removes model and associated versions]

### API Routes
<!-- List REST or RPC routes and required changes -->
- **`POST /api/models`:** [Creates a model]  
- **`GET /api/models`:** [Fetches all models]  
- **`PUT /api/models/:id/status`:** [Updates model status]

---

## 7. Frontend Changes

### New Components
<!-- Describe any new UI pieces -->
- **`components/ModelList.tsx`:** [Table of models with actions]  
- **`components/ModelForm.tsx`:** [Form to create or edit a model]

### Component Updates
<!-- Describe existing components to modify -->
- **`components/Layout/Sidebar.tsx`:** [Add “Models” nav link]  
- **`components/Header.tsx`:** [Show model count badge]

### Page Updates
<!-- Describe pages or routes to add/update -->
- **`app/models/page.tsx`:** [Main models management page]  
- **`app/models/loading.tsx`:** [Skeleton while loading models]

---

## 8. Implementation Plan

> **AI Agent Instructions:**  
> 1. Break the work into 3–5 logical phases (e.g., "Unit Tests", “Setup & Configuration”, “Backend Implementation”, “Frontend Implementation”, “Integration & Testing”).  
> 2. For each phase:  
>    - Provide a one-sentence **Goal** summarizing the phase’s purpose.  
>    - List 3–6 discrete **Task** items as checkboxes.  
>    - Each task should reference specific files, functions, or components and describe exactly what to build or change.  
>    - Order tasks in the sequence they should be implemented and tested.

### Phase 0: [Deployment / Wrap‐up]
**Goal:** [Brief description of what this phase accomplishes]

- [ ] **Task 0.1:** [Create unit tests for missing functionality]
- [ ] **Task 0.2:** [Create unit tests replicating problem to be fixed]

### Phase 1: [Phase Name]
**Goal:** [Brief description of what this phase accomplishes]

- [ ] **Task 1.1:** [Describe the first preparatory step, e.g., “Update `drizzle/schema/*` to include new tables.”]  
- [ ] **Task 1.2:** [Describe the next setup action, e.g., “Generate SQL migration and review in PR.”]  
- [ ] **Task 1.3:** [Optional additional setup or configuration tasks]

### Phase 2: [Phase Name]
**Goal:** [Brief description of what this phase accomplishes]

- [ ] **Task 2.1:** [Describe a concrete coding step, e.g., “Implement `getFoo()` query in `lib/foo.ts`.”]  
- [ ] **Task 2.2:** [Describe a related Server Action or endpoint, e.g., “Add `createFoo()` in `app/actions/foo.ts`.”]  
- [ ] **Task 2.3:** [Additional backend logic or unit tests]

### Phase 3: [Phase Name]
**Goal:** [Brief description of what this phase accomplishes]

- [ ] **Task 3.1:** [Describe a UI component to scaffold, e.g., “Create `FooList.tsx` under `components/foo/`.”]  
- [ ] **Task 3.2:** [Detail integration, e.g., “Hook `FooList` into `app/(protected)/foo/page.tsx` and fetch via `getFoo()`.”]  
- [ ] **Task 3.3:** [Styling, interaction, and edge-case handling]

### Phase 4: [Phase Name]
**Goal:** [Brief description of what this phase accomplishes]

- [ ] **Task 4.1:** [Describe integration tests or end-to-end tests, e.g., “Write Playwright test for CRUD flow.”]  
- [ ] **Task 4.2:** [Performance or load testing, e.g., “Benchmark API response under 1000 req/s.”]  
- [ ] **Task 4.3:** [Accessibility audit, linting, or final cleanup]