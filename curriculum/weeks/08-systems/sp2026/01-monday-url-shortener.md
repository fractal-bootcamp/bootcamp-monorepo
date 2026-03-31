# Systems Engineering Week: URL Shortener

Today we will build a URL shortener similar to Bit.ly or TinyURL. Goal is to be able to handle 1 billion short URLs and 100 million daily active users (DAUs).

Example system design approaches:

- Hello Interview: https://www.youtube.com/watch?v=iUU4O1sWtJA
- Jordan Has No Life: https://www.youtube.com/watch?v=xFeWVugaouk
- Byte Byte Go: https://bytebytego.com/courses/system-design-interview/design-a-url-shortener

## Steel Thread

To start, implement the core functionality of the shortener. Start with a single API server that handles all operations in memory.

- Core "write" path: creator can provide a long URL and get back a short URL that will redirect to the long URL when clicked.
  - Implement this as a POST request to a /urls endpoint.
  - Short URLs should be encoded as a 6-character Base62 string.
- Core "read" path: User can follow the short URL and the server returns a 302 redirect response that sends the user to the long URL.
  - Implement this as a GET request to a /{shortCode} endpoint.
- Custom short URLs: creator can request a specific `shortCode` for their URL. If it's available, map the long URL to that short URL.
- Instrument these endpoints to measure latency and error rates using OTel LGTM.

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic" (some URLs will be much more popular than others).

## Go Deeper

- Persistence: move the storage of long-to-short URL mapping from server memory to a database. The `shortCode` will be the primary key
- Speed: add a Redis or Memcached instance to cache popular short URLs (this addresses the "celebrity problem")
- Analytics: record the number of clicks on each short URL and visualize them.
- Scalability: split the Read and Write APIs onto separate servers so they can be scaled independently (observe that for URL shorteners there are likely to be many more reads than writes).
- Scalability pt 2: create an ID generator service that allocates blocks of IDs to write server instances. These IDs will be Base62 encoded into the `shortCode` for the shortened URL.

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
