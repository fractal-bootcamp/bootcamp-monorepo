# Systems Engineering Week: Ticketing Service

Today we will build a ticketing service similar to Ticketmaster or Stubhub. Goal is to be able to handle 100M DAUs, 100k events per day.

Example system design approaches:

- Hello Interview: https://www.youtube.com/watch?v=fhdPyoO6aXI
  - Text description: https://www.hellointerview.com/learn/system-design/problem-breakdowns/ticketmaster
- Jordan Has No Life: https://www.youtube.com/watch?v=sMgxHf9AU_U

## Functional Requirements

- Users should be able to view events
- Users should be able to search for events
- Users should be able to book tickets to events

## Steel Thread

To start, implement the core functionality of the ticketing service. Start with a single API server that handles all operations in memory.

- Event viewing: return event details (date, description, performer, venue) and the venue's seat map with ticket availability statuses. Implement as GET /events/:eventId.
  - When an event is created, generate a ticket for every seat in the venue based on the seat map. Each ticket tracks its section, row, seat number, price, and status (available/sold).
- Event search: users can search events by keyword, date range, and pagination. Implement as GET /events/search?keyword={keyword}&start={date}&end={date}&page={n}.
- Booking flow (simple version): user selects ticket IDs and submits a booking. The server runs a transaction that checks ticket availability, marks selected tickets as "sold", and creates a booking record. If any ticket was already taken, the transaction fails and returns an error.
  - Implement as POST /bookings/:eventId with a body of `{ ticketIds: string[] }`.
- Instrument these endpoints to measure latency and error rates using OTel LGTM.

After you've built this, load-test your server with synthetic traffic with the suggested [load testing](week-plan-claude-enhanced.md#load-testing) tools. Aim to make your traffic "realistic" (simulate hot events where many users try to book the same seats concurrently).

## Go Deeper

- Seat reservation with TTL: split the booking into two steps — reserve and confirm. When a user selects a seat, lock that ticket using a Redis distributed lock (https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/) with a 10-minute TTL and create a booking with status "in-progress". If the user abandons checkout, the lock auto-expires and the ticket becomes available again. On payment confirmation, update the ticket to "sold" and the booking to "confirmed".
- Real-time seat map: push seat status changes to connected clients via Server-Sent Events (SSE) so the seat map stays current as other users book tickets.
- Scalability for hot events: add a virtual waiting queue in front of the event page for extremely popular events. Instead of letting millions of users hit the seat map simultaneously, admit users in batches. This prevents seat map staleness and reduces contention on the booking service.

## Artifact

See the [Artifact](week-plan-concise.md#artifact) section in the Week Plan for instructions on what to produce.
