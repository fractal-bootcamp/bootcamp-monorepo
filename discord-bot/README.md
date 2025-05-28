# Discord Bot

A Discord bot built with TypeScript, Bun, and Discord.js v14. Features slash commands and scheduled messages.

This is the official Fractal Tech discord bot, so we use it for Fractal Tech things.

## Features

- Slash commands with registration and handling
- Scheduled messages via cron jobs
- TypeScript support
- Modular architecture separating command registration from execution
- Error handling and logging
- Hot reload for development

## Project Structure

```
discord-bot/
├── bot.ts                 # Main bot entry point - handles client setup and events
├── commands.ts            # Command definitions, registration, and execution logic
├── register-commands.ts   # Standalone script for registering commands with Discord
├── cron.ts               # Scheduled message system with cron job management
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

### File Purposes

#### `bot.ts` - Main Bot Entry Point
- Long running node (bun) process, needs to run on a server
- Sets up the Discord client with proper intents
- Handles incoming events
- Starts cron jobs
- Routes slash command interactions to the command handler
- Manages graceful shutdown and error handling
- **Purpose**: Core bot server lifecycle management.

#### `commands.ts` - Command System
- define available commands
- allow users to register commands with discord's servers
- handle execution of incoming events
- **Purpose**: Complete command system - everything related to slash commands

#### `register-commands.ts` - Command Registration Script
- executable script for registering commands
- **Purpose**: Allows command registration without starting/interrupting the full bot

#### `cron.ts` - Scheduled Messages
- uses node-cron to setup cron jobs for scheduled discord bot usage
- channel targeting for message delivery
- **Purpose**: Handles all scheduled discord tasks

## Setup

### Prerequisites
- [Bun](https://bun.sh) installed
- Discord bot token and application ID
- Discord server for testing

### 1. Install Dependencies
```bash
bun install
```

### 2. Environment Variables
Create a `.env` file:
```env
BOT_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here  # Optional: for faster command updates during development
```

#### How to Get These Values:
- **BOT_TOKEN**: Discord Developer Portal > Bot > Token
- **CLIENT_ID**: Discord Developer Portal > General Information > Application ID  
- **GUILD_ID**: Right-click server name > Copy Server ID (requires Developer Mode)

### 3. Register Commands
```bash
bun run register
```

### 4. Start the Bot
```bash
# Development mode (auto-restart on changes)
bun run dev

# Production mode
bun run start
```

## Available Scripts

- `bun run dev` - Start bot in development mode with auto-restart
- `bun run start` - Start bot in production mode
- `bun run register` - Register slash commands with Discord
- `bun run build` - Compile TypeScript
- `bun run type-check` - Type check without emitting files

## Adding New Commands

1. **Add to commands array** in `commands.ts`:
```typescript
{
    name: 'ping',
    description: 'Check bot latency',
    type: 1,
    handler: async (interaction) => {
        const ping = interaction.client.ws.ping;
        await interaction.reply(`🏓 Pong! Latency: ${ping}ms`);
    }
}
```

2. **Register the new command**:
```bash
bun run register
```

## Configuring Scheduled Messages

Edit the `CRON_JOBS` array in `cron.ts`:

```typescript
{
    name: 'Good Morning',
    schedule: '0 9 * * *',  // Every day at 9 AM
    message: 'Good morning everyone! 🌅',
    channelId: 'YOUR_CHANNEL_ID',
    enabled: true
}
```

### Cron Syntax Reference
```
┌─────────────── minute (0-59)
│ ┌───────────── hour (0-23)  
│ │ ┌─────────── day of month (1-31)
│ │ │ ┌───────── month (1-12)
│ │ │ │ ┌─────── day of week (0-6, 0=Sunday)
│ │ │ │ │
* * * * *
```

**Examples**:
- `0 9 * * *` - Every day at 9:00 AM
- `0 14 * * 1` - Every Monday at 2:00 PM  
- `*/30 * * * *` - Every 30 minutes