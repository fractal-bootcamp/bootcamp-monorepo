# Systems Engineering Week: Chat Service

Today we will build a chat service similar to WhatsApp or Facebook Messenger. Goal is to be able to handle 1 billion DAUs.

Example system design approaches:

- Hello Interview: https://www.youtube.com/watch?v=cr6p0n0N-VA
- Jordan Has No Life: https://www.youtube.com/watch?v=IbwgUJcGMnA
- Byte Byte Go https://bytebytego.com/courses/system-design-interview/design-a-chat-system

## Functional Requirements

- Users should be able to start group chats with multiple participants (limit 100).
- Users should be able to send/receive messages.
- Users should be able to receive messages sent while they are not online (up to 30 days).
- Users should be able to send/receive media in their messages.

## Steel Thread

To start, implement the core functionality of the chat service. Start with a single server that handles all operations in memory.

- Connection: establish persistent WebSocket connections between clients and the server.
- Core "send" path: a connected user can send a text message (up to 10,000 characters) to another user. The server looks up the recipient's WebSocket connection and delivers the message in real time.
  - Each message should have a unique, time-sortable ID (e.g. a timestamp + sequence counter). Messages only need to be ordered within a single conversation.
- Core "receive" path: a connected user receives messages pushed to them over their WebSocket connection without polling.
- Group chats: users can create a group chat (limit 100 participants) and send messages to it. The server fans out each group message to every participant's WebSocket connection.
  - Implement group management (create, join, leave) as REST endpoints (POST/DELETE on a /chats resource).
- Presence: track which users are currently connected. Expose a GET /presence/:userId endpoint that returns whether a user is online or offline.
- Instrument these endpoints to measure latency and error rates using OTel LGTM.

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic" (simulate bursts of messages in popular group chats, users going online/offline, etc.).

## Go Deeper

- Persistence: move message storage from server memory to a key-value store (e.g. Cassandra or DynamoDB). Partition messages by `channel_id` with `message_id` as the sort key so you can efficiently fetch recent messages for any conversation.
- Offline delivery: when a recipient is not connected, buffer their messages. On reconnect, the client sends its `last_seen_message_id` and the server returns all messages with a higher ID.
- Presence heartbeat: replace the naive "connected = online" check with a heartbeat mechanism. Clients send a heartbeat every 5 seconds; the server marks a user offline if no heartbeat is received within 30 seconds. This prevents status flickering from brief network interruptions.
- Media attachments: allow users to send images and files. Upload media to an object store (e.g. S3) via a separate HTTP endpoint, then send a message containing the media URL and metadata (file type, size, thumbnail). Keep media transfer off the WebSocket connection.
- Scalability: run multiple chat server instances. Use a message queue (e.g. Redis Pub/Sub) so that when User A sends a message through Server 1, it is delivered to User B who is connected to Server 2. Each server subscribes to queues for the users it serves.

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
