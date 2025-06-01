/**
 * Integration test for sendScheduledMessage and general Discord bot setup.
 * 
 * This test will attempt to send a real message to a Discord channel using the bot's credentials.
 * 
 * Requirements:
 * - Set the following environment variables before running:
 *   - BOT_TOKEN: The bot's Discord token
 *   - TEST_CHANNEL_ID: The channel ID to send the test message to
 * 
 * WARNING: This will send a real message to the specified channel.
 * 
 * Run with: vitest discord-bot/cron.test.ts
 */

import { test as baseTest, expect } from "vitest";
import { Client, GatewayIntentBits } from "discord.js";
import { sendScheduledMessage } from "./cron";

const BOT_TOKEN = process.env.BOT_TOKEN;
const TEST_CHANNEL_ID = process.env.TEST_CHANNEL_ID;

if (!BOT_TOKEN || !TEST_CHANNEL_ID) {
    throw new Error(
        "BOT_TOKEN and TEST_CHANNEL_ID environment variables must be set for integration test."
    );
}

const test = baseTest.extend<{
    discordClient: Client;
}>({
    discordClient: async ({ }, use: (client: Client) => Promise<void>) => {
        const client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        });

        await new Promise<void>((resolve, reject) => {
            client.once("ready", () => resolve());
            client.once("error", reject);
            client.login(BOT_TOKEN).catch(reject);
        });

        // Provide the client to the test
        await use(client);

        // Cleanup after each test
        await client.destroy();
    },
});

test("sendScheduledMessage integration - sends a message to the test channel", async ({ discordClient }: { discordClient: Client }) => {
    const job = {
        name: "integration_test",
        schedule: "* * * * *",
        channelId: TEST_CHANNEL_ID,
        enabled: true,
        message: {
            content: `🤖 Integration test message from Fractal Tech bot at ${new Date().toISOString()}`,
            mentions: [],
        },
    };

    await sendScheduledMessage(job, discordClient);
});

test("bot can login and fetch test channel", async ({ discordClient }: { discordClient: Client }) => {
    const channel = await discordClient.channels.fetch(TEST_CHANNEL_ID);

    expect(channel).toBeTruthy();
    expect(channel?.isTextBased()).toBe(true);
});
