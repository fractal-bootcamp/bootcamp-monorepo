#!/usr/bin/env bun
import { registerCommands } from './commands';

// ===== CONFIGURATION =====
const CONFIG = {
    TOKEN: process.env.BOT_TOKEN || '',
    CLIENT_ID: process.env.CLIENT_ID || '',
    GUILD_ID: process.env.GUILD_ID || ''
};

// ===== VALIDATION =====
if (!CONFIG.TOKEN || !CONFIG.CLIENT_ID) {
    console.error('❌ Missing required environment variables: BOT_TOKEN and CLIENT_ID');
    process.exit(1);
}

// ===== REGISTER COMMANDS =====
async function main() {
    console.log('🚀 Starting command registration...');

    try {
        await registerCommands(CONFIG.TOKEN, CONFIG.CLIENT_ID, CONFIG.GUILD_ID);
        console.log('✅ Command registration complete!');
    } catch (error) {
        console.error('❌ Failed to register commands:', error);
        process.exit(1);
    }
}

main(); 