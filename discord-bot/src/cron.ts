import cron, { type ScheduledTask } from 'node-cron';
import type { Client, TextChannel } from 'discord.js';

const EOD_CHANNEL_ID = '1336123201968935006'
const READING_CHANNEL_ID = '1336694823050285169'
const PRACTICE_CHANNEL_ID = '1378928414181949480'
const BOT_TEST_ID = '1377482428062629978'

interface CronMessage {
    content: string;
    mentions: string[];
}

interface CronJob {
    name: string;
    schedule: string;
    channelId: string;
    enabled: boolean;
    message: CronMessage;
}

interface TimezoneConfig {
    timezone: string;
    locale: string;
}

// ===== TIMEZONE CONFIGURATION =====
const TIMEZONE_CONFIG: TimezoneConfig = {
    timezone: 'America/New_York', // Change to your timezone
    locale: 'en-US'
};

// ===== MESSAGE TEMPLATES =====
const EOD_STATUS_TEMPLATE = `Reminder @su2025, 📝 Please submit your EOD status report

*Template*:
*Blockers* - what is blocking you from making more progress and having more fun?
*Wins* - What wins are worth celebrating today? 
*PRs* - link all your PRS for the day
*Code Review* - Link your one PR review for the day`;

const DAILY_READINGS_TEMPLATE = `@su2025, this is your daily thread to discuss today's readings.

*post your questions/comments/highlights/notes in this thread by the start of lecture tomorrow*

readings are not optional, and if you do not complete them you may be... 🤖||T3RM1N4T3D!!||🤖

todo: andrew needs to actually wire this up with the readings, but for now you can find today's reading in here:
https://github.com/fractal-bootcamp/bootcamp-monorepo/tree/main/curriculum/weeks
`

const DAILY_PRACTICE_TEMPLATE = `@su2025, this is your daily thread to discuss today's practice problems.

*post your questions/comments/highlights/notes/revelations in this thread by the start of lecture tomorrow*

practice problems are not optional unless you complete them all in advance!

any suborbination may be punished with... 🤖||T3RM1N4T10N!!||🤖

todo: andrew needs to actually wire this up with the practice problems, but for now you can find today's practice problems in here:
https://github.com/fractal-bootcamp/bootcamp-monorepo/tree/main/curriculum/weeks
`

// ===== CRON JOB DEFINITIONS =====
const CRON_JOBS: CronJob[] = [
    {
        name: 'weekly_meeting',
        schedule: '0 14 * * 1', // Every Monday at 2:00 PM
        channelId: EOD_CHANNEL_ID,
        enabled: false,
        message: {
            content: '📅 Weekly team meeting starts in 15 minutes!',
            mentions: ['@here'] // or role IDs: ['<@&ROLE_ID>']
        }
    },
    {
        name: 'every_minute_test',
        schedule: '* * * * *', // Every minute
        channelId: EOD_CHANNEL_ID,
        enabled: false, // Disabled - was for testing only
        message: {
            content: '⏰ This is your every-minute cron test message!',
            mentions: [] // No mentions
        }
    },
    {
        name: 'midnight_test',
        schedule: '0 0 * * *', // Every day at midnight
        channelId: BOT_TEST_ID, // Make sure this constant is defined elsewhere
        enabled: true, // Enabled for nightly testing
        message: {
            content: '🌙 This is your midnight cron test message, the crons should work tomorrow!',
            mentions: [] // No mentions
        }
    },
    {
        name: 'eod_status_reminder',
        schedule: '0 18 * * 1-6', // Monday through Saturday at 6:00 PM
        channelId: EOD_CHANNEL_ID,
        enabled: true,
        message: {
            content: EOD_STATUS_TEMPLATE,
            mentions: ['@su2025']
        }
    },
    {
        name: 'daily_reading',
        schedule: '0 8 * * 1-6', // Monday through Saturday at 10:00 AM
        channelId: READING_CHANNEL_ID, // READING_CHANNEL
        enabled: true,
        message: {
            content: DAILY_READINGS_TEMPLATE,
            mentions: ['@su2025']
        }
    },
    {
        name: 'daily_practice',
        schedule: '0 8 * * 1-6', // Monday through Saturday at 10:00 AM
        channelId: PRACTICE_CHANNEL_ID, // PRACTICE CHANNEL ID
        enabled: true,
        message: {
            content: DAILY_PRACTICE_TEMPLATE,
            mentions: ['@su2025']
        }
    },
];

const activeCronJobs = new Map<string, ScheduledTask>();

export function startCronJobs(client: Client): void {
    CRON_JOBS.forEach((job: CronJob) => {
        if (job.enabled) {
            const cronTask: ScheduledTask = cron.schedule(job.schedule, async (): Promise<void> => {
                await sendScheduledMessage(job, client);
            }, {
                timezone: TIMEZONE_CONFIG.timezone
            });

            activeCronJobs.set(job.name, cronTask);
            console.log(`✅ Started cron job: ${job.name}(${job.schedule})`);
        } else {
            console.log(`⏸️  Skipped disabled job: ${job.name}`);
        }
    });
}

export function stopCronJobs(): void {
    activeCronJobs.forEach((task: ScheduledTask, name: string) => {
        task.stop();
        console.log(`🛑 Stopped cron job: ${name}`);
    });
    activeCronJobs.clear();
}

export async function sendScheduledMessage(job: CronJob, client: Client): Promise<void> {
    try {
        const channel = await client.channels.fetch(job.channelId);
        if (!channel || !channel.isTextBased()) {
            console.error(`❌ Channel not found or not text - based: ${job.channelId} for job: ${job.name} `);
            return;
        }

        let messageContent = job.message.content;

        // Add mentions if specified
        if (job.message.mentions && job.message.mentions.length > 0) {
            const mentions = job.message.mentions.map((mention: string) => {
                if (mention === '@everyone' || mention === '@here') {
                    return mention;
                } else if (mention.startsWith('<@&')) {
                    return mention; // Role mention
                } else {
                    return `< @${mention}> `; // User ID mention
                }
            }).join(' ');

            messageContent = `${mentions} \n\n${messageContent} `;
        }

        await (channel as TextChannel).send(messageContent);
        console.log(`📨 Sent scheduled message for job: ${job.name} `);
    } catch (error) {
        console.error(`❌ Error sending scheduled message for ${job.name}: `, error);
    }
}