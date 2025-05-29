import { REST, Routes, User, GuildMember, type APIInteractionGuildMember, ChatInputCommandInteraction, MessageFlags } from 'discord.js';


type CommandHandler = (interaction: ChatInputCommandInteraction) => Promise<void>;

export interface SlashCommand {
    name: string;
    description: string;
    type: number;
    handler: CommandHandler;
}

// ===== COMMAND HANDLERS =====
async function handleHelloCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    const { user, member } = interaction;

    const userInfo: string[] = [
        `👋 Hello <@${user.id}>!`,
        ``,
        `**User Information:**`,
        `• **Username:** ${user.username}`,
        `• **Display Name:** ${user.globalName || user.username}`,
        `• **User ID:** ${user.id}`,
        `• **Account Created:** <t:${Math.floor(Number((BigInt(user.id) >> 22n) + 1420070400000n) / 1000)}:F>`,
        `• **Bot Account:** ${user.bot ? 'Yes' : 'No'}`
    ];

    if (member && member instanceof GuildMember) {
        userInfo.push(
            ``,
            `**Server Member Information:**`,
            `• **Nickname:** ${member.nickname || 'None'}`,
            `• **Joined Server:** <t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`,
            `• **Roles:** ${member.roles.cache.size > 1 ? member.roles.cache.filter(role => role.name !== '@everyone').map(role => `<@&${role.id}>`).join(', ') : 'None'}`,
            `• **Server Permissions:** ${member.permissions.toArray().join(', ') || 'None'}`,
            `• **Booster:** ${member.premiumSince ? 'Yes' : 'No'}`
        );
    }

    await interaction.reply({
        content: userInfo.join('\n'),
    });
}

// ===== SLASH COMMANDS DEFINITIONS =====
const COMMANDS: SlashCommand[] = [
    {
        name: 'hello',
        description: 'Get a personalized greeting with your user information',
        type: 1,
        handler: handleHelloCommand
    }
];

// Create a command registry for easy lookup
const COMMAND_HANDLERS = new Map<string, CommandHandler>();

// Populate the command registry
COMMANDS.forEach(command => {
    COMMAND_HANDLERS.set(command.name, command.handler);
});

// ===== COMMAND EXECUTION =====
export async function handleCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    const handler = COMMAND_HANDLERS.get(interaction.commandName);

    if (!handler) {
        await interaction.reply({
            content: 'Unknown command!',
            flags: MessageFlags.Ephemeral,
        });
        return;
    }

    try {
        await handler(interaction);
    } catch (error) {
        console.error(`Error handling ${interaction.commandName} command:`, error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'Sorry, I encountered an error!',
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'Sorry, I encountered an error!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
}


// ===== COMMAND REGISTRATION =====
// ===== WHY REGISTRATION AND EXECUTION ARE SEPARATE =====
/*
Discord's slash command system has a unique two-phase architecture:

1. REGISTRATION PHASE:
   - We send command definitions (name, description, options) to Discord's servers
   - Discord stores these definitions and makes them available in the UI
   - Users see these commands in the autocomplete when typing "/"
   - This only needs to happen when commands are added/changed, not on every bot restart

2. EXECUTION PHASE:
   - When a user selects a command, Discord sends an interaction to our bot
   - Our bot receives the interaction and needs to handle it with our custom logic
   - The handler functions with our business logic run on OUR server, not Discord's

This separation exists because:
- Discord hosts the command definitions for fast UI responsiveness
- Our bot hosts the actual command logic for security and customization
- Commands persist even when our bot is offline (they just fail when executed)
- We can update command logic without re-registering (but need to re-register for definition changes)

Think of it like a restaurant menu (Discord) vs the kitchen (our bot):
- The menu shows what's available (command registration)
- The kitchen makes the actual food when ordered (command execution)
*/
export async function registerCommands(token: string, clientId: string, guildId?: string): Promise<void> {
    const discordRest = new REST({ version: '10' }).setToken(token);

    // Strip handlers from commands before sending to Discord (they don't need to know about our handlers)
    const commandsForDiscord = COMMANDS.map(({ handler, ...command }) => command);

    try {
        console.log('Started refreshing application (/) commands.');

        if (guildId) {
            await discordRest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commandsForDiscord }
            );
            console.log('Successfully reloaded guild application (/) commands.');
        } else {
            await discordRest.put(
                Routes.applicationCommands(clientId),
                { body: commandsForDiscord }
            );
            console.log('Successfully reloaded global application (/) commands.');
        }
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}