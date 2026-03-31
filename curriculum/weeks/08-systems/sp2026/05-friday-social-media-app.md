# Systems Engineering Week: Social Media App

Today we will build a social media app similar to Instagram or Twitter. Goal is to be able to handle 500M DAU with 100M posts per day.

Example system design approaches:

- Hello Interview: https://www.youtube.com/watch?v=Nfa-uUHuFHg
  - Text guide: https://www.hellointerview.com/learn/system-design/problem-breakdowns/instagram
- Jordan Has No Life: https://www.youtube.com/watch?v=S2y9_XYOZsg

## Functional Requirements

- Users should be able to create posts featuring photos, videos, and a simple caption
- Users should be able to follow other users
- Users should be able to see a chronological feed of posts from the users they follow

## Steel Thread

To start, implement the core functionality of the social media app. Start with a single API server that handles all operations in memory.

- Post creation: a user uploads a photo or video with a caption. Store the media as a file on disk (or in memory) and the post metadata (userId, caption, media path, timestamp) in an in-memory store. Implement as POST /posts. Return a postId.
- Follow: a user can follow another user, creating a unidirectional relationship (I follow you, but you don't necessarily follow me). The follower ID comes from the auth token. Implement as POST /follows with a body of `{ followedId }`.
- Feed generation (fan-out on read): return a chronological feed of posts from users the requester follows. Query the follows list, gather recent posts from each followed user, merge and sort by timestamp, and paginate. Implement as GET /feed?cursor={cursor}&limit={limit}.
- Instrument these endpoints to measure latency and error rates using OTel LGTM.

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic" (power-law distribution: a few accounts post frequently and have many followers, most accounts post rarely).

## Go Deeper

- Fan-out on write: replace the fan-out-on-read feed with precomputed per-user feeds. When a user creates a post, enqueue a job that writes the post reference into each follower's feed cache (e.g. a Redis sorted set keyed by userId, scored by timestamp). Feed reads become a single sorted-set range query instead of N queries across followed accounts.
- Celebrity problem (hybrid fan-out): pure fan-out on write breaks down for accounts with millions of followers — writing to millions of feeds per post is too expensive. Use a hybrid approach: precompute feeds for normal users, but for celebrities (accounts above a follower threshold), merge their posts at read time. The feed endpoint pulls the precomputed feed from cache and mixes in recent celebrity posts on the fly.
- Media upload pipeline: replace direct file upload with presigned URLs. POST /posts creates the post metadata (with media status "pending") and returns a presigned S3 URL. The client uploads directly to S3 using multipart upload (required for videos up to 4GB). On upload completion, an S3 event notification triggers a background job that updates the post's media status to "complete".
- CDN for media delivery: serve photos and videos through a CDN (e.g. CloudFront) so media loads from edge locations close to the user. Generate optimized variants (thumbnails, different resolutions) for different device sizes.
- Persistence and indexing: move metadata from memory to a database (e.g. DynamoDB or PostgreSQL). For the Posts table, partition by userId and sort by createdAt to efficiently query a user's recent posts. For the Follows table, partition by followerId to efficiently look up who a user follows.

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
