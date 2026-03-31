# Systems Engineering Week: Ride Share Service

Today we will build a ride share service similar to Uber or Lyft. Goal is to be able to handle 100M daily active users, 15M rides per day.

Example system design approaches:

- Hello Interview: https://www.youtube.com/watch?v=lsKU38RKQSo
- Jordan Has No Life: https://www.youtube.com/watch?v=rUAdeHpCPq8

## Functional Requirements

- Riders should be able to input a start location and a destination and get a fare estimate
- Riders should be able to request a ride based on the estimated fare
- Drivers should be able to accept/decline a request and navigate to pickup/drop-off

## Steel Thread

To start, implement the core functionality of the ride share service. Start with a single API server that handles all operations in memory.

-
- Instrument these endpoints to measure latency and error rates using OTel LGTM.

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic".

## Go Deeper

-

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
