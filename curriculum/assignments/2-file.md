# File Upload

## Overview

In this assignment, you will create a new or extend a previous project by adding a secure file or image upload feature. Users will be authenticated, and their uploaded files will be securely stored in an AWS S3 bucket. Each user will have access only to their own files, unless they choose to share with another user.

## Core Concepts

- AWS S3  
- Authentication  
- Secure file upload

## Features

Your project should have the following:

- [ ] 3 Views  
      - [ ] Upload Files  
      - [ ] View Folder (metadata like filename, created\_at timestamp, file\_size)  
            - [ ] My Files  
            - [ ] Shared With Me
      - [ ] View File  
            - [ ] Share (if “my file”)  
- [ ] Backend \+ S3 Bucket For Storing Images  
      - [ ] Client Upload  
      - [ ] Server Upload  
      - [ ] Server Retrieval  
- [ ] Authentication  
      - [ ] Configure sharing by email

## Technology to Use

- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) \-- use these to use forms that submit data to your server in NextJS  
- [AWS S3 Client](https://www.npmjs.com/package/@aws-sdk/client-s3)  
- [https://nextjs.org/docs/app/api-reference/cli/create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)  
- [https://uploadthing.com/](https://uploadthing.com/)  
- Eg: [https://vercel.com/templates/next.js/aws-s3-image-upload-nextjs](https://vercel.com/templates/next.js/aws-s3-image-upload-nextjs)

Example Apps:
- [Theo's Google Drive Clone](https://www.youtube.com/watch?v=c-hKSbzooAg)

Example Repos:

- [Upload1](https://github.com/fractal-bootcamp/upload1) (aws server actions)  
- [Upload2](https://github.com/fractal-bootcamp/upload2) (uploadthing)

Old stuff:

- [Multer - File Uploads](https://www.npmjs.com/package/multer)
