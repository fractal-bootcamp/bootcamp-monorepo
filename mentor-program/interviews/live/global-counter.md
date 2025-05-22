# Full-Stack Developer Interview: Global Click Counter

## Interview Overview

**Duration:** 90 minutes  
**Format:** Live coding session with discussion  
**Level:** Mid Full-Stack Developer  
**Focus:** Full-Stack Architecture, Real-time Systems, UX Engineering

## Problem Statement

Build a "Global Click Counter" - a web application where anyone on the internet can increment a shared counter. The key challenge is creating an "honest" user experience where click counts feel immediate and reliable, even under high concurrency.

## Technical Requirements

### Technology Stack
- **Frontend:** Candidate's choice (React, NextJS, Vanilla JS, etc.)
- **Backend:** Candidate's choice (Node.js, Bun, Serverless, Python, Go, etc.)
- **Language:** TypeScript/JavaScript preferred, but not required
- **Database:** Candidate's choice (SQLite, PostgreSQL, Redis, etc.)
- **Real-time Communication:** WebSockets, SSE, or polling
- **Deployment:** Local development focus, production deployment optional

### Core Features
1. **Global Counter Display**
   - Shows the current total clicks from all users
   - Updates in real-time across all connected clients

2. **Click Button**
   - Increments the global counter
   - Provides immediate visual feedback

3. **Real-time Synchronization**
   - All connected users see the same count
   - New users see the current count immediately

### Critical UX Requirements

The application must feel "honest" and immediate:
- **Optimistic Updates:** Clicks appear instantly in the UI
- **Network Resilience:** Graceful handling of connection issues
- **Race Condition Handling:** Multiple rapid clicks across many clients should work correctly

## Evaluation Framework

|Area|Key questions|
|---|---|
|**Correctness**|All must-have behaviours observable?  
|**Simplicity**|Is the solution as simple as possible? Simple, clean code. A simple system design. Minimal scope to meet the requirements. Minimal complexity.|
|**Code Cleanliness**|Consistent style, descriptive names, small components, no dead code, good comments to explain confusing elements. Good library choices.|
|**UX Quality**|Smooth infinite scroll, auto-scroll on new message, focus handling, mobile?|
|**Time/Scope Management**|Delivered a working slice first, documented stretch goals?|

*A perfect score does **not** require every stretch goal; clarity and execution trump bells & whistles.*

---

## Success Indicators

### Excellent Performance
- Counter updates feel completely instantaneous
- Clean, production-ready code structure
- Demonstrates deep understanding of real-time systems

### Good Performance
- Counter works reliably with minor delays
- Basic error handling in place
- Solid TypeScript implementation
- Shows understanding of scaling challenges

### Needs Improvement
- Counter updates with noticeable delays
- Limited error handling
- Basic implementation without UX considerations
- Unclear system design reasoning


## Notes for Interviewers

### What to Look For
- **Problem-solving approach:** Do they ask clarifying questions?
- **Technology choices:** Can they justify their stack selection?
- **Full-stack thinking:** Do they consider both frontend and backend concerns?
- **Code quality:** Clean, readable, well-structured code
- **UX awareness:** Do they consider the user experience?
- **Technical depth:** Understanding of underlying concepts
- **Communication:** Can they explain their decisions clearly?

### Red Flags
- Overengineering the solution from the start
- Choosing inappropriate technologies without justification
- Ignoring error handling completely  
- Poor separation of frontend/backend concerns
- No consideration for user experience
- Unable to explain architectural decisions

### Guidance for Candidates
- Start simple and iterate
- Think out loud during implementation  
- Consider edge cases and error scenarios
- Ask questions when requirements are unclear
- Focus on the user experience throughout