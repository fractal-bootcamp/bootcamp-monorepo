# Systems Engineering Week: Ride Share Service

Today we will build a ride share service similar to Uber or Lyft. Goal is to be able to handle 100M daily active users, 15M rides per day.

Example system design approaches:

- Hello Interview: https://www.youtube.com/watch?v=lsKU38RKQSo
  - Text guide: https://www.hellointerview.com/learn/system-design/problem-breakdowns/uber
- Jordan Has No Life: https://www.youtube.com/watch?v=rUAdeHpCPq8

## Functional Requirements

- Riders should be able to input a start location and a destination and get a fare estimate
- Riders should be able to request a ride based on the estimated fare
- Drivers should be able to accept/decline a request and navigate to pickup/drop-off

## Steel Thread

To start, implement the core functionality of the ride share service. Start with a single API server that handles all operations in memory.

- Fare estimation: rider provides a pickup location and destination. The server calculates distance and travel time (use a third-party mapping API or a simple distance formula to start) and applies a pricing model to return a fare estimate. Implement as POST /fares with a body of `{ pickupLocation, destination }`. Persist the Fare entity so you can track estimates that were never accepted.
- Driver location updates: drivers periodically report their position. Implement as POST /drivers/location with a body of `{ lat, long }` (driver identity comes from the auth token, not the request body). Store locations in memory keyed by driver ID.
- Ride request and matching: rider confirms a fare and requests a ride. The server finds the closest available driver from the in-memory location store and sends them the request. Implement as POST /rides with a body of `{ fareId }`.
  - The ride goes through a lifecycle: requested → accepted → in-progress → completed.
- Driver accept/decline: driver accepts or declines a matched request. If they decline (or don't respond within 10 seconds), the server offers the ride to the next closest driver. Implement as PATCH /rides/:rideId with a body of `{ status: "accepted" | "declined" }`.
- Instrument these endpoints to measure latency and error rates using OTel LGTM.

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic" (simulate clusters of ride requests from the same area, drivers moving around, peak-hour bursts).

## Go Deeper

- Geospatial indexing: replace the naive in-memory location scan with Redis geospatial commands (GEOADD, GEOSEARCH). Drivers update their position into a Redis sorted set with geohashes, and the matching service queries for the nearest available drivers within a radius. This handles the write throughput of millions of driver location updates.
- Matching consistency: use a Redis distributed lock with a TTL (e.g. 10 seconds) when offering a ride to a driver. This prevents the same driver from receiving multiple simultaneous ride requests. If the lock expires without a response, release it and offer to the next driver.
- Ride request queue: place ride requests into a message queue (e.g. SQS or Kafka) that the matching service consumes. This prevents dropped requests during peak demand — if a matching service instance crashes, the message stays in the queue for another consumer. Scale consumers dynamically based on queue depth.
- Adaptive location updates: reduce server load by having the driver client adjust its ping frequency based on movement. If the driver is stationary or moving slowly, send updates less often; if moving quickly or turning, send more frequently. This is client-side intelligence that dramatically reduces write volume.
- Scalability: geo-shard the location data so ride requests in a region only query the shard for that region. Use read replicas for read-heavy operations like fare estimation and ride tracking.

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
