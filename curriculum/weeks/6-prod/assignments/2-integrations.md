# Integrations - Mailing List Builder

## Overview

Build a website that allows users to build, manage, and send emails to mailing lists. Mailing lists should be stored in a database and can be viewed and edited via a user interface. There should also be an integration with Google Sheets for syncing mailing lists once they are created. Users should be able to hit "sync" and update them quickly. Additionally, the website should support user authentication.

## Core Concepts

- Full-Stack Development  
- API Integrations (SendGrid/Mailgun, Google Sheets)  
- Databases

## Features

Your mailing list builder should have the following features

- [ ] Authentication  
      - [ ] Multi-user authentication using Clerk or Firebase  
- [ ] 3 Primary Views  
      - [ ] Dashboard  
      - [ ] Mailing List Management  
      - [ ] Email Composition and Sending  
- [ ] Dashboard  
      - [ ] A quick view of recently sent email blasts  
      - [ ] Links to mailing list management and email composition screens  
- [ ] Mailing List Management  
      - [ ] Create, read, update, and delete (CRUD) operations on mailing lists  
      - [ ] Sync to Google Sheets (allow user to put in their own api key)  
      - [ ] BONUS: Sync to [AirTable](https://airtable.com/)  
- [ ] Email Composition and Sending  
      - [ ] Compose and send emails to selected mailing lists  
      - [ ] Use a rich text or markdown editor to construct emails (ex. TipTap)

Bonus:

- [ ] Install both Sendgrid and Mailgun, and allow the user to choose which tool will be used to send using a [client gateway pattern](https://chatgpt.com/share/7567a3cf-d468-411e-a4bd-19511fa8fbfd)  
- [ ] Install twilio and add text blasts \+ phone numbers

## Stretch Goal

- [ ] Set up an independent server for syncing. The sync service will subscribe to changes in mailing lists via webhook, and Google Sheets via a cron job every 5 minutes, and keep the two in sync. Bonus points for writing it in Go or Python.

## Technologies to Use

- Boilerplate  
  - Shell script - app can be built with your preferred stack  
- Tools  
  - [resend](https://resend.com/)  
  - [SendGrid](https://www.npmjs.com/package/@sendgrid/mail) or [MailGun](https://www.mailgun.com/)  
  - [Google Sheets](https://developers.google.com/sheets/api/guides/concepts)  
  - [Rich Text/Markdown](https://tiptap.dev/docs/editor/getting-started/install/react) OR [draft.js](http://draft.js) ([https://www.npmjs.com/package/draft-js-export-html](https://www.npmjs.com/package/draft-js-export-html))  
  - [React-email](https://react.email/)

## Installation Instructions

- **Ideally use the boilerplate generator that you built. If you haven’t yet set one up, use a fellow student’s.**

## Inspiration

- [Google sheets](https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f)  
- [https://docs.github.com/en/rest/users](https://docs.github.com/en/rest/users)
