# Systems Engineering Week: Tuesday

Today we will build a chat service similar to WhatsApp or Facebook Messenger. Goal is to be able to handle 1 billion DAUs.

Example system design approaches:
- Jordan Has No Life: https://www.youtube.com/watch?v=IbwgUJcGMnA
- Hello Interview: https://www.youtube.com/watch?v=cr6p0n0N-VA

## Functional Requirements

- Users should be able to start group chats with multiple participants (limit 100).
- Users should be able to send/receive messages.
- Users should be able to receive messages sent while they are not online (up to 30 days).
- Users should be able to send/receive media in their messages.

## Steel Thread

To start, implement the core functionality of the chat service. Start with a single API server that handles all operations in memory.

- 
- Instrument these endpoints to measure latency and error rates using OTel LGTM. 

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic".

## Go Deeper

- 

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.