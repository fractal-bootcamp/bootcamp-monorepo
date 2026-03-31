# Systems Engineering Week: Friday

Today we will build a social media app similar to Instagram or Twitter. Goal is to be able to handle 500M DAU with 100M posts per day.

Example system design approaches:
- Jordan Has No Life: https://www.youtube.com/watch?v=S2y9_XYOZsg
- Hello Interview: https://www.youtube.com/watch?v=Nfa-uUHuFHg

## Functional Requirements

- Users should be able to create posts featuring photos, videos, and a simple caption
- Users should be able to follow other users
- Users should be able to see a chronological feed of posts from the users they follow

## Steel Thread

To start, implement the core functionality of the social media app. Start with a single API server that handles all operations in memory.

- 
- Instrument these endpoints to measure latency and error rates using OTel LGTM. 

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic".

## Go Deeper

- 

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
