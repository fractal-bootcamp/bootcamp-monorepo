// ===== SETUP INSTRUCTIONS =====
/*
SETUP INSTRUCTIONS:

0. Setup bun project:
   bun init

1. Install dependencies:
   npm install discord.js node-cron
   npm install -D @types/node-cron

2. Configure the bot:
   - Replace YOUR_BOT_TOKEN_HERE with your bot token (Discord Developer Portal > Bot > Token)
   - Replace YOUR_CLIENT_ID_HERE with your bot's client ID (Discord Developer Portal > General Information > Application ID)
   - Replace YOUR_GUILD_ID_HERE with your server ID (Right-click server name > Copy Server ID - requires Developer Mode)
   - Replace YOUR_CHANNEL_ID_HERE with the channel ID where messages should be sent (Right-click channel name > Copy Channel ID)

3. Configure cron jobs:
   - Edit the CRON_JOBS array to add/modify scheduled messages
   - Set enabled: true/false to control which jobs run
   - Use standard cron syntax (minute hour day month dayOfWeek)
   - Examples:
     '0 9 * * *'     = Every day at 9:00 AM
     '0 14 * * 1'    = Every Monday at 2:00 PM
     '0 17 * * 1-5'  = Weekdays at 5:00 PM
     '*/30 * * * *'  = Every 30 minutes

4. Set your timezone:
   - Update TIMEZONE_CONFIG.timezone to your local timezone
   - Examples: 'America/New_York', 'Europe/London', 'Asia/Tokyo'

7. Configure mentions:
   - '@everyone' or '@here' for general mentions
   - User IDs as strings: ['123456789012345678']
   - Role mentions: ['<@&ROLE_ID_HERE>']

8. Compile and run:
   npx tsc
   node dist/bot.js

   Or for development:
   npx ts-node bot.ts

CRON SYNTAX REFERENCE:
┌────────────── minute (0-59)
│ ┌──────────── hour (0-23)  
│ │ ┌────────── day of month (1-31)
│ │ │ ┌──────── month (1-12)
│ │ │ │ ┌────── day of week (0-6, 0=Sunday)
│ │ │ │ │
* * * * *
*/