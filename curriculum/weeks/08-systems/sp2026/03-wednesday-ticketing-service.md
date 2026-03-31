# Systems Engineering Week: Ticketing Service

Today we will build a ticketing service similar to Ticketmaster or Stubhub. Goal is to be able to handle 100M DAUs, 100k events per day.

Example system design approaches:

- Hello Interview: https://www.youtube.com/watch?v=fhdPyoO6aXI
- Jordan Has No Life: https://www.youtube.com/watch?v=sMgxHf9AU_U

## Functional Requirements

- Users should be able to view events
- Users should be able to search for events
- Users should be able to book tickets to events

## Steel Thread

To start, implement the core functionality of the ticketing service. Start with a single API server that handles all operations in memory.

-
- Instrument these endpoints to measure latency and error rates using OTel LGTM.

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic".

## Go Deeper

-

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
