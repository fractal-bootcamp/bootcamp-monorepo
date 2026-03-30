# Week 8: Systems Engineering (Spring 2026)

One of the best ways to become a master of a craft is to copy the works of your great predecessors. This week, we're going to build well-engineered clones of various popular systems in order to internalize the patterns that show up repeatedly and to build our intuition for how such systems "should" be built so they can efficiently handle large numbers of users. And thanks to LLM-powered coding, we can actually build clones of these systems in a day or less.

The difference between vibe coding and engineering is whether or not you have a plan. Engineering also allows you to answer quantitative questions about the performance of a system, especially how much it costs to operate. When you buy a car, you want to know how many miles per gallon it gets. Similarly, the business will want to know how much it costs to operate the system and whether or not it can handle the expected load.

For each system you will produce:

- A complete working prototype of the system.
- A description of the system's functional and non-functional requirements.
    - Functional requirements: the specific features that must be supported by the system (e.g., users can upload videos and watch other users' videos): https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#1-functional-requirements
    - Non-functional requirements: performance characteristics or other behavioral qualities of the system (e.g., the system can support 100MM daily active users (DAUs)): https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#2-non-functional-requirements
- A diagram showing the design of the system.
- A data model showing the core entities in the system and their properties.
    - Reference: https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#core-entities-2-minutes
- The API endpoints needed to support your design.
    - Reference: https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery#api-or-system-interface-5-minutes
- At least one quantitative model that calculates some characteristic of the system (e.g., how much storage do you need if you have 100MM DAUs).
    - Numbers to know: https://www.hellointerview.com/learn/system-design/in-a-hurry/core-concepts#numbers-to-know
- A dashboard showing performance characteristics of different parts of the system (e.g. API response times, error rates).
    - Recommendation: Use the OpenTelemtry (OTel) LGTM stack: https://hub.docker.com/r/grafana/otel-lgtm
- A report about what you learned, what was surprising, and other reflections.

On Monday, we'll all do the URL shortener clone, but after that we'll leave it up to you to decide which systems to copy. Examples:

- URL shortener (Bit.ly or TinyURL clone): https://www.youtube.com/watch?v=xFeWVugaouk
- Social media site (Twitter/Instagram clone): https://www.youtube.com/watch?v=S2y9_XYOZsg
- Video platform (Netflix/YouTube clone): https://www.youtube.com/watch?v=43bB7oSn190
- Ticketing platform (Ticketmaster/StubHub clone): https://www.youtube.com/watch?v=sMgxHf9AU_U
- Stock trading platform (Robinhood clone): https://www.youtube.com/watch?v=SAa6xFyATcw
- Ad Click Aggregator: https://www.youtube.com/watch?v=6TroztUV3f8
- Chat service (WhatsApp/FB Messenger): https://www.youtube.com/watch?v=IbwgUJcGMnA
- Auction site (Ebay clone): https://www.youtube.com/watch?v=3aX-lC5_P1M
- Livestreaming platform (Twitch/Kick clone): https://www.youtube.com/watch?v=MWjQs9I7clo

All examples taken from https://www.youtube.com/@jordanhasnolife5163. Feel free to pick different systems for which there is an accompanying video or other ones entirely.
