# **Global State**

## Overview

Create a task management application using Zustand. The app should support a standard set of task features and themes, as well as customizable themes. All state should be managed globally, there should be no state management inside of any components.

Lite clone of linear.

## Core Concepts

- React Component Development  
- Global State Management with Zustand  
- Theming and Customization

## Features

Your todo app should have the following features

- [ ] Persistence  
      - [ ] Use local storage to persist changes across refresh  
- [ ] 2 Primary Views  
      - [ ] Tabbed Task View  
      - [ ] Task Management Page  
- [ ] Tabbed Task View  
      - [ ] Status Tabs: view all tasks in each status. Click the task to open the subview.  
            - [ ] Statuses \- Pending, In Progress, Completed, Archived  
      - [ ] Task Edit Subview:
            - [ ] Edit task details and assign theme from dropdown  
      - [ ] Tasks should have:  
            - [ ] Details \- title, description, state  
            - [ ] Colors based on the global theme \- background, text, primary, secondary, accent  
- [ ] Task Management Page  
      - [ ] Create task  
      - [ ] Create Custom Theme \- light/dark should be built in  
      - [ ] View all tasks in a scrollable list, edit titles inline, options for editing and deleting

## Stretch Goal

- [ ] Add filters and task-wide on the task management page  
- [ ] Use the subview in a cross-view modal  
- [ ] Use your component library\!

## Technologies to Use

- Zustand \- [https://docs.pmnd.rs/zustand/getting-started/introduction](https://docs.pmnd.rs/zustand/getting-started/introduction)  
- Linear \- [https://linear.app/](https://linear.app/)

---
