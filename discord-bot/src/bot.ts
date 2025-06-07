import { Client, GatewayIntentBits, ChatInputCommandInteraction } from 'discord.js';
import { startCronJobs, stopCronJobs } from './cron';
import { handleCommand } from './commands';

// ===== CONFIGURATION =====
const CONFIG = {
    TOKEN: process.env.BOT_TOKEN || '',
    CLIENT_ID: process.env.CLIENT_ID || '',
    GUILD_ID: process.env.GUILD_ID || ''
};

// ===== BOT SETUP =====
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// ===== EVENT HANDLERS =====
client.once('ready', async (): Promise<void> => {
    console.log(`✅ Bot is ready! Logged in as ${client.user?.username}`);
    startCronJobs(client);
});

client.on('interactionCreate', async (interaction): Promise<void> => {
    if (!interaction.isChatInputCommand()) return;

    await handleCommand(interaction as ChatInputCommandInteraction);
});

// ===== ERROR HANDLING =====
client.on('error', (error: Error): void => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>): void => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGINT', (): void => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    stopCronJobs();
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', (): void => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    stopCronJobs();
    client.destroy();
    process.exit(0);
});

// ===== START BOT =====
client.login(CONFIG.TOKEN);