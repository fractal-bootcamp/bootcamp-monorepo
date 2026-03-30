# Week 8: Systems Engineering (Spring 2026)

## Philosophy

One of the best ways to master a craft is to copy the works of your predecessors. Painters do it. Musicians do it. Engineers should too.

This week, you're building well-engineered clones of real systems — URL shorteners, social media platforms, video services, trading platforms. Not toy versions. Working prototypes with real designs, real data models, real performance characteristics. Thanks to LLM-powered coding, you can actually build a credible clone of a complex system in a day or less.

But here's the thing that separates engineering from vibe coding: **engineers have a plan.** When the business asks "how much will this cost to operate?" or "can this handle our expected load?", an engineer has an answer — the cost per user, the latency at peak, the storage at scale. This week, you learn to answer those questions.

The arc: **Design a system → Build it → Instrument it → Measure it → Explain what you learned.** Then do it again with a harder system.

---

## Structure

Each system you build follows the same discipline. You start with a design, build a working prototype, instrument it for observability, and produce a quantitative analysis. The first system (URL shortener) is done together on Monday so everyone calibrates on what "done" looks like. After that, you choose your own systems and go deeper.

This is not a tutorial week. There are no step-by-step guides. You're given a system design video, a set of deliverables, and you figure out how to build it. The videos give you the architecture. The deliverables give you the bar. Claude gives you leverage. Your job is to make engineering decisions and justify them.

**Collaboration:** When choosing your systems, try to pick at least one system that someone else is also building. Building the same system independently and then comparing your designs is one of the fastest ways to learn — you'll make different trade-offs, hit different bottlenecks, and see solutions you wouldn't have considered.

---

## The Deliverables

For **each system** you clone, you produce the following. This is not a checklist to rush through — each deliverable is a skill unto itself, and the discipline of producing all of them is what makes this week different from "just build something."

Your prototype should focus on the **backend and infrastructure** — the API, data layer, caching, queues, and system architecture. You don't need a polished frontend. A working API that you can hit with a load tester and observe on a dashboard is more valuable than a pretty UI sitting on top of an unexamined system.

### 1. Requirements

Before you write a line of code, write down what the system needs to do and how well it needs to do it.

**Functional requirements** are the specific features the system must support, expressed as "Users should be able to..." statements. For a URL shortener: users can create a shortened URL, users can be redirected when visiting a shortened URL, users can view click analytics. Pick the top 3. A long list of functional requirements is worse than a short one — it means you haven't prioritized. ([Reference](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#1-functional-requirements))

**Non-functional requirements** are the performance characteristics and behavioral qualities of the system, expressed as "The system should..." statements. These must be **quantified** — "low latency" is not a requirement; "redirects complete in < 100ms at p99" is. Think through:

- **CAP tradeoff** — does this system favor consistency or availability?
- **Scale** — how many DAUs? What's the read/write ratio? Is traffic bursty?
- **Latency** — what are the latency targets for critical paths?
- **Durability** — what happens if data is lost?
- **Security and compliance** — what are the trust boundaries?

([Reference](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#2-non-functional-requirements))

### 2. System Design Diagram

A visual representation of your system's architecture. This should show the major components (clients, load balancers, application servers, databases, caches, queues, external services) and how data flows between them. Use Excalidraw or whatever tool you like. The diagram should be something you could hand to another engineer and they'd understand the system without reading your code.

### 3. Data Model

The core entities in the system and their properties. These are the fundamental nouns — the actors and resources that satisfy your functional requirements. Start with a short bulleted list, not an exhaustive schema. For a URL shortener: `ShortURL` (id, original_url, short_code, created_at, click_count), `Click` (id, short_url_id, timestamp, referrer, user_agent). ([Reference](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#core-entities-2-minutes))

### 4. API Design

The contract between your system and its clients. Each functional requirement should map to at least one endpoint. Default to REST unless you have a specific reason for GraphQL or gRPC. Design rules: plural resource names (`/urls`, not `/url`), derive user identity from auth tokens (not request bodies), keep sensitive data out of URL parameters. ([Reference](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#api-or-system-interface-5-minutes))

### 5. Quantitative Model (Back-of-Envelope)

At least one calculation that answers a real capacity question about your system. This is where you use actual numbers to reason about what your system needs at scale. Examples:

- **Storage**: If you have 100M DAUs and each user creates 0.5 shortened URLs per day, how much storage do you need per year?
- **Throughput**: If you have 100:1 read-to-write ratio and 50M new URLs per day, what's your required read QPS?
- **Bandwidth**: If the average redirect response is 300 bytes and you serve 5B redirects per day, what's your bandwidth requirement?

**Numbers to know** ([Reference](https://www.hellointerview.com/learn/system-design/in-a-hurry/core-concepts#numbers-to-know)):

| Operation                      | Latency                       |
| ------------------------------ | ----------------------------- |
| Memory access                  | Nanoseconds                   |
| SSD read                       | Microseconds                  |
| Network call (same datacenter) | 1-10 ms                       |
| Cross-continent network call   | Tens to hundreds of ms        |
| Redis cache hit                | ~1 ms (20-50x faster than DB) |
| Database query                 | 20-50 ms                      |

| Resource              | Capacity                                                   |
| --------------------- | ---------------------------------------------------------- |
| Single Redis instance | Hundreds of thousands of ops/sec, up to 1 TB memory        |
| Single database       | Tens of thousands of reads or writes/sec, a few TB storage |
| Sharding trigger      | Write throughput > ~10K TPS, or data > tens of TB          |

Modern hardware is far more powerful than most people assume. Calculate from actual requirements rather than jumping to premature scaling.

### 6. Observability Dashboard

A dashboard showing real performance characteristics of your running system. Use the **OpenTelemetry (OTel) LGTM stack** — it bundles Loki (logs), Grafana (dashboards), Tempo (traces), and Mimir/Prometheus (metrics) in a single Docker container: [grafana/otel-lgtm](https://hub.docker.com/r/grafana/otel-lgtm).

At minimum, your dashboard should show:

- **Request rate** — how many requests per second is your system handling?
- **Latency distribution** — p50, p95, p99 response times for your critical endpoints
- **Error rate** — what percentage of requests are failing?
- **Resource utilization** — CPU, memory, connections

Instrument your code with OpenTelemetry, send telemetry to the collector, and build Grafana dashboards that visualize the data. Then **generate load** against your system (use a load testing tool like `hey`, `k6`, or `wrk`) and watch your dashboard light up. This is when it gets real — you'll see where your system breaks, where latency spikes, where errors appear.

### 7. Reflection Report

A short written report about what you learned. Not a tutorial. Not a summary of what you built. A reflection:

- What surprised you about the design?
- Where did your initial design break down?
- What would you change if you built it again?
- How did the quantitative model compare to what you actually measured?
- What did you learn about this type of system that you didn't know before?

---

## Repo Structure

All your work lives in a single repo. The top-level README is an index of every system you cloned. Each system gets its own top-level folder containing:

```
systems-engineering/
├── README.md                  # Index: list of systems with one-line descriptions
├── url-shortener/
│   ├── README.md              # Requirements, data model, API, quantitative model, reflection
│   ├── system-diagram.excalidraw
│   ├── system-diagram.png     # Exported image of the diagram
│   └── src/                   # Working prototype + docker-compose, dashboards, etc.
├── chat-service/
│   ├── README.md
│   ├── system-diagram.excalidraw
│   ├── system-diagram.png
│   └── src/
└── ...
```

The README inside each system folder is the single document that contains your requirements, data model, API design, quantitative model, and reflection. The system diagram lives alongside it as both an Excalidraw file (editable) and an exported image (viewable). The working prototype and any supporting infrastructure (Docker Compose, Grafana dashboard JSON, load test scripts) live in `src/` or however you want to organize the code.

---

## Progression

### Start Together: URL Shortener

On Monday, everyone builds the same system: a **URL shortener** (Bit.ly / TinyURL clone). This calibrates the group on what "done" looks like and ensures everyone can produce the full set of deliverables. It's also one of the most elegant system design problems — simple enough to build in a day, deep enough to surface real engineering decisions (how do you generate short codes? how do you handle collisions? how do you make redirects fast? what happens at 1B URLs?).

Watch this video before or during your build: https://www.youtube.com/watch?v=xFeWVugaouk

### Then Choose Your Own

After Monday, you choose which systems to clone. Pick systems that interest you, that scare you a little, that force you to deal with problems you haven't seen before. A chat service has different challenges than a stock trading platform. A video platform forces you to think about storage and CDNs. A ticketing system forces you to think about concurrency and fairness. Each system teaches different lessons.

Aim to complete **one system per day** over the course of the week (including the URL shortener). The more systems you build, the more patterns you internalize, and the better your intuition gets.

---

## Example Systems

All examples below have accompanying system design videos from [Jordan Has No Life](https://www.youtube.com/@jordanhasnolife5163). Watch the video first to understand the architecture, then build your clone.

| System              | Clone of               | Video                                       | Key Engineering Challenges                                     |
| ------------------- | ---------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| URL Shortener       | Bit.ly / TinyURL       | https://www.youtube.com/watch?v=xFeWVugaouk | Hash/encoding strategies, redirect latency, analytics at scale |
| Social Media        | Twitter / Instagram    | https://www.youtube.com/watch?v=S2y9_XYOZsg | Fan-out on write vs. read, feed ranking, social graph          |
| Video Platform      | Netflix / YouTube      | https://www.youtube.com/watch?v=43bB7oSn190 | Video storage/transcoding, CDN design, adaptive streaming      |
| Ticketing Platform  | Ticketmaster / StubHub | https://www.youtube.com/watch?v=sMgxHf9AU_U | Concurrency control, seat reservation, fairness under load     |
| Stock Trading       | Robinhood              | https://www.youtube.com/watch?v=SAa6xFyATcw | Order matching, consistency, real-time price feeds             |
| Ad Click Aggregator | —                      | https://www.youtube.com/watch?v=6TroztUV3f8 | Stream processing, deduplication, approximate counting         |
| Chat Service        | WhatsApp / Messenger   | https://www.youtube.com/watch?v=IbwgUJcGMnA | WebSockets, presence, message ordering, delivery guarantees    |
| Auction Site        | eBay                   | https://www.youtube.com/watch?v=3aX-lC5_P1M | Real-time bidding, concurrency, time-based state transitions   |
| Livestreaming       | Twitch / Kick          | https://www.youtube.com/watch?v=MWjQs9I7clo | Low-latency video ingest, chat at scale, viewer count          |

Feel free to pick systems not on this list. The requirement is that you have a reference design (video, blog post, paper) to work from — you're studying the masters, not designing in a vacuum.

---

## What Good Looks Like

A great submission for a single system looks like this:

- **Requirements** that are specific and quantified, not vague hand-waving
- **A diagram** that another engineer could implement from without talking to you
- **A data model** that reflects real trade-offs (why did you denormalize that table? why is this a separate service?)
- **An API** that is clean, RESTful, and maps clearly to the functional requirements
- **A quantitative model** with actual math — not "we need a lot of storage" but "we need 18 TB/year assuming 100M DAUs at 0.5 URLs/day averaging 360 bytes per record"
- **A dashboard** showing real metrics from real load against your running system
- **A reflection** that demonstrates you actually learned something, not just that you finished

The bar is not perfection. The bar is engineering discipline. Did you think before you built? Can you explain your decisions? Can you answer quantitative questions about your system?

---

## Saturday: Presentations

Pick one of the systems you built this week — the one you're proudest of, or the one where you learned the most — and present it.

### Format

**3 minutes max.** This is a system design presentation, not a product demo. Walk the room through your design the way you'd walk a team through a technical design review:

1. **Requirements** — What does the system do? What are the non-functional requirements you designed for?
2. **Architecture** — Walk through your system diagram. Why did you make the decisions you made?
3. **Quantitative model** — Show the math. What are the capacity requirements at scale?
4. **Dashboard** — Show real metrics from your running system under load. Where did it break? Where did it hold up?
5. **What you learned** — What surprised you? What would you do differently?

If someone else built the same system, that's where it gets interesting — compare designs. Different trade-offs, different bottlenecks, different solutions to the same problem. That comparison is worth more than either presentation alone.

---

## Resources

### System Design Fundamentals

- [Hello Interview — System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery) — the framework we're using for requirements, entities, and API design
- [Hello Interview — Core Concepts](https://www.hellointerview.com/learn/system-design/in-a-hurry/core-concepts) — numbers to know, scaling fundamentals
- [Jordan Has No Life (YouTube)](https://www.youtube.com/@jordanhasnolife5163) — system design video walkthroughs for each example system

### Observability

- [OpenTelemetry](https://opentelemetry.io/) — vendor-neutral instrumentation for metrics, logs, and traces
- [grafana/otel-lgtm Docker image](https://hub.docker.com/r/grafana/otel-lgtm) — all-in-one LGTM stack for local development
- [Grafana Dashboards](https://grafana.com/docs/grafana/latest/dashboards/) — building dashboards from your telemetry data

### Load Testing

- [hey](https://github.com/rakyll/hey) — simple HTTP load generator
- [k6](https://k6.io/) — scriptable load testing tool (good for complex scenarios)
- [wrk](https://github.com/wg/wrk) — high-throughput HTTP benchmarking tool

### Back-of-Envelope Estimation

- [Jeff Dean's Numbers Everyone Should Know](http://brenocon.com/dean_perf_numbers_2009.pdf) — classic latency reference
- [System Design Primer — Back of the Envelope](https://github.com/donnemartin/system-design-primer#back-of-the-envelope-estimation) — estimation practice
