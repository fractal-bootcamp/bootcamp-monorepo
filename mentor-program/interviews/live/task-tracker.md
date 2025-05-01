# Coding Challenge: Company Dissolution Tracker

## Overview
In this coding challenge, you will build a React/TypeScript application that helps our users track the status of their company dissolution process. The tracker will provide a clear visual representation of where a user is in the process of shutting down their business.

## Time Allocation
- **Recommended time**: 90 minutes
- **Discussion afterwards**: 30 minutes

## Requirements

### What is the Dissolution Tracker?
The Dissolution Tracker is a component that shows users:
1. The sequential steps required to close down a business
2. Which steps are completed, in progress, and not yet started
3. The documents required for each step and their status
4. A clear indicator of overall progress through the dissolution process

### Core Functionality
1. Create a React/TypeScript application that displays a multi-step company dissolution tracker
2. Show a progress indicator for the overall dissolution process
3. Allow users to view detailed information about each step
4. Display required documents for each step and their current status

### Technical Requirements
1. Use React with TypeScript
2. Implement proper type definitions
3. Use React hooks for state management
4. Make the UI responsive for both desktop and mobile

### Data Structure
Use the following data structure as a starting point:

```typescript
// Types for the dissolution process
interface DissolutionStep {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedDate?: string;
  documents?: Document[];
  nextActions?: string[];
}

interface Document {
  id: string;
  name: string;
  status: 'required' | 'uploaded' | 'approved' | 'rejected';
  uploadedDate?: string;
}

// Mock initial data (you can use this as your starting state)
const initialDissolutionSteps: DissolutionStep[] = [
  {
    id: "step1",
    title: "Board Resolution",
    description: "Obtain a formal resolution from the company board approving the dissolution.",
    status: "completed",
    completedDate: "2025-04-15",
    documents: [
      {
        id: "doc1",
        name: "Board Resolution Document",
        status: "approved",
        uploadedDate: "2025-04-10"
      }
    ]
  },
  {
    id: "step2",
    title: "State Filing Preparation",
    description: "Prepare the necessary documents for state filing of dissolution.",
    status: "in_progress",
    documents: [
      {
        id: "doc2",
        name: "Articles of Dissolution",
        status: "uploaded",
        uploadedDate: "2025-04-25"
      },
      {
        id: "doc3",
        name: "Tax Clearance Certificate",
        status: "required"
      }
    ],
    nextActions: [
      "Upload Tax Clearance Certificate",
      "Review Articles of Dissolution"
    ]
  },
  {
    id: "step3",
    title: "Creditor Notifications",
    description: "Notify all known creditors about the dissolution process.",
    status: "not_started",
    documents: [
      {
        id: "doc4",
        name: "Creditor Notification Template",
        status: "required"
      }
    ],
    nextActions: [
      "Generate creditor list",
      "Prepare notification letters"
    ]
  },
  {
    id: "step4",
    title: "Asset Distribution",
    description: "Distribute remaining assets to shareholders according to ownership percentages.",
    status: "not_started",
    nextActions: [
      "Prepare asset inventory"
    ]
  },
  {
    id: "step5",
    title: "Final Tax Returns",
    description: "File final federal and state tax returns.",
    status: "not_started"
  }
];
```

## User Interface Requirements

1. **Progress Overview**
   - Create a visual progress indicator showing all steps in the dissolution process
   - Each step should be color-coded by status (completed, in progress, not started)
   - Show the percentage of completion for the overall process

2. **Step Details View**
   - Create an expandable/collapsible view for each step
   - Display required documents for each step and their statuses
   - Show next actions needed to complete each step

3. **Responsive Design**
   - The interface should work well on both desktop and mobile devices

## Optional Stretch Goals (only if time permits)

1. Add a feature to upload documents (UI only, no actual file handling needed)
2. Add a simple filter to view only certain steps (e.g., "show only in-progress steps")

## Evaluation Criteria

Your solution will be evaluated based on:

1. **Code Quality**
   - Clean, maintainable TypeScript code
   - Proper component structure
   - Effective type definitions

2. **Functionality**
   - Implementation of all core requirements
   - Proper state management
   - Error handling for edge cases

3. **User Experience**
   - Intuitive interface design
   - Responsive layout
   - Attention to details like loading states

4. **Technical Decisions**
   - Appropriate use of React hooks and patterns
   - Explanations of design decisions

## What We're Looking For

We want to see how you approach building a user-friendly interface that helps users navigate a complex process. The focus should be on clarity, usability, and code quality rather than flashy features.

## Submission

Please be prepared to:
1. Walk through your code and explain key design decisions
2. Discuss any challenges you faced and how you overcame them
3. Share what you would improve if you had more time

Good luck!
