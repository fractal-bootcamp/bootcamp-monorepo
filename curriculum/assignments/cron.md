# Cron Jobs

## Overview

In this project, you will learn how to spin up an EC2 instance, deploy a cron job on it, and send an email notification via a Node.js script. The cron job will execute the Node.js script at specified intervals to send an email.

## Core Concepts

- AWS EC2  
- SSH and remote server management  
- Cron jobs  
- Basic Linux command line

## Features

Your setup should have the following:

- [ ] EC2 Instance  
      - [ ] Instance Creation  
      - [ ] SSH Access  
- [ ] Cron Job  
      - [ ] Node.js Script to Send Email  
      - [ ] Cron Job Local Logs  
- [ ] Bonus  
      - [ ] \[Notification\]: Configure notifications for cron job failures using AWS SNS  
      - [ ] Set up your EC2 server to serve a react app

—-

## Installation Instructions

1. ### Create an EC2 Instance

2. ### SSH into the EC2 Instance

   \*\* Make sure to change the permissions of your key pair file:  
   `chmod 400 path/to/your-key-pair.pem`  

   And SSH into your instance:  
   `ssh -i "path/to/your-key-pair.pem" ec2-user@your-ec2-public-dns`

3. ### Set up dependencies (e.g. install bun)

   1. Write these down and include in a “setup” script so you can do this again quickly

4. ### Write a “deploy.sh” script to update your cron job

   1. Hint: \`scp\`

5. ### Write a typescript script that does *something* on a regular basis

   1. If you don’t have any ideas, write a small function that gets the weather and sends you a daily email reminding you to take an umbrella. Use Mailjet for emails.

6. ### Set up the cronjob

   1. Hint: \`crontab\`

## Inspiration

- [AWS EC2 Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-connect-to-instance)  
- [Cron Documentation](https://man7.org/linux/man-pages/man5/crontab.5.html)  
- [Installing Crontab on AMI](https://jainsaket-1994.medium.com/installing-crontab-on-amazon-linux-2023-ec2-98cf2708b171)  
- [What is SSH?](https://www.techtarget.com/searchsecurity/definition/Secure-Shell)  
- [Mailjet Documentation](https://www.mailjet.com/)
