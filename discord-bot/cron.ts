import cron, { type ScheduledTask } from 'node-cron';
import type { Client, TextChannel } from 'discord.js';

const EOD_CHANNEL_ID = process.env.CHANNEL_ID || '';

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

// ===== CRON JOB DEFINITIONS =====
const CRON_JOBS: CronJob[] = [
    {
        name: 'daily_reminder',
        schedule: '0 9 * * *', // Every day at 9:00 AM
        channelId: EOD_CHANNEL_ID,
        enabled: true,
        message: {
            content: '🌅 Good morning everyone! Time for the daily standup!',
            mentions: ['@everyone'] // or specific user IDs: ['123456789', '987654321']
        }
    },
    {
        name: 'weekly_meeting',
        schedule: '0 14 * * 1', // Every Monday at 2:00 PM
        channelId: EOD_CHANNEL_ID,
        enabled: true,
        message: {
            content: '📅 Weekly team meeting starts in 15 minutes!',
            mentions: ['@here'] // or role IDs: ['<@&ROLE_ID>']
        }
    },
    {
        name: 'end_of_day',
        schedule: '0 17 * * 1-5', // Weekdays at 5:00 PM
        channelId: EOD_CHANNEL_ID,
        enabled: false, // Disabled by default
        message: {
            content: '🕔 End of workday! Don\'t forget to log your hours.',
            mentions: [] // No mentions
        }
    }
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
            console.log(`✅ Started cron job: ${job.name} (${job.schedule})`);
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

async function sendScheduledMessage(job: CronJob, client: Client): Promise<void> {
    try {
        const channel = await client.channels.fetch(job.channelId);
        if (!channel || !channel.isTextBased()) {
            console.error(`❌ Channel not found or not text-based: ${job.channelId} for job: ${job.name}`);
            return;
        }

        let messageContent: string = job.message.content;

        // Add mentions if specified
        if (job.message.mentions && job.message.mentions.length > 0) {
            const mentions: string = job.message.mentions.map((mention: string) => {
                if (mention === '@everyone' || mention === '@here') {
                    return mention;
                } else if (mention.startsWith('<@&')) {
                    return mention; // Role mention
                } else {
                    return `<@${mention}>`; // User ID mention
                }
            }).join(' ');

            messageContent = `${mentions}\n\n${messageContent}`;
        }

        await (channel as TextChannel).send(messageContent);
        console.log(`📨 Sent scheduled message for job: ${job.name}`);
    } catch (error) {
        console.error(`❌ Error sending scheduled message for ${job.name}:`, error);
    }
}