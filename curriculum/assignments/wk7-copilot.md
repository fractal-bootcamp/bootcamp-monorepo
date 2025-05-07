**AI Copilot Chat for Task Management**

### Overview

Expand on the task management app by incorporating an AI-powered copilot that can assist users in drafting tasks and epics. This AI copilot should help users generate task descriptions and group related tasks into epics (logical bundles of tickets). Epics can contain multiple tasks, each with its own title, description, and status. Use Instructor for structured output.

### Core Concepts

- AI Chat  
- AI Structured Output

### Features

#### Core Features

The following features should be built on top of the existing task management application:

- [ ] AI Copilot  
      - [ ] Integrate an AI-powered chat interface that can respond to user commands such as "create a new epic for frontend tasks" or "generate a task for database optimization."  
            - [ ] Draft epics  
            - [ ] Draft tickets  
- [ ] Epics  
      - [ ] Add the concept of epics, each consisting of multiple tasks  
      - [ ] Add a view for Epics  
      - [ ] User should be able to assign tasks to an epic, view and manage within an epic  
- [ ] Task Management Page Enhancements  
      - [ ] Extend the existing Task Management Page with:  
            - [ ] An option to assign tasks to specific epics  
            - [ ] Filters to view tasks by epic, status, or both  
            - [ ] Inline editing for epics and tasks, including options to delete tasks from epics  
- [ ] Task and Epic Edit Subview  
      - [ ] Allow editing of both tasks and epics from a subview modal:  
            - [ ] Task Details: title, description, status, and epic  
            - [ ] Epic Details: title and description  
            - [ ] Apply global theme

### Stretch Goals

- [ ] MORE AI  
      - [ ] Link task dependencies  
      - [ ] Manage tickets from the chat (update statuses, for example)  
- [ ] Epic Overview Page  
      - [ ] Create a new page to view all epics, including an AI summary of the epic (overall status, etc)

### Technologies to Use

- Instructor \- [https://github.com/instructor-ai/instructor-js](https://github.com/instructor-ai/instructor-js)  
- Open AI \- [https://github.com/openai/openai-node](https://github.com/openai/openai-node)  
- Zod \- [https://zod.dev/](https://zod.dev/)
