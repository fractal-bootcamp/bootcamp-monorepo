# Day 5: Spearfishing (Day 2) + Record Your Walkthrough

Yesterday you picked a target, specced a demo, and started building. Today you finish. By the end of the day, you should have a deployed, working spearfish, a recorded video walkthrough you can send to anyone, and a drafted outreach email ready to deliver it. The video is the deliverable, not the code — a good project with a clear, compelling 2-3 minute video that lands in the right inbox changes your trajectory. A brilliant project that nobody sees is worth nothing.

---

## Step 0: Checklist — Did You Finish Yesterday's Work?

Before moving on, check that you have the following artifacts committed and pushed to your career starter repo:

**From Day 1:**

- [ ] **Journal/reflection** artifacts covering: who am I, what can I do, what can I offer right now, where do I want to go, how do I want to grow, where do I belong
- [ ] **Elevator pitch** document with all four versions (5 seconds, 30 seconds, 60 seconds, 5 minutes)
- [ ] **Audit** document with sections for each surface (LinkedIn, personal website, resume, GitHub), every item marked Good, Gap, or Misaligned
- [ ] **Resume** file in the repo

**From Day 2:**

- [ ] **Marketing questions** (`marketing-questions.md`) — all 13 questions answered with depth
- [ ] **Updated artifacts** — LinkedIn, personal website, resume, GitHub all improved based on Day 2 work
- [ ] **Documented feedback** — notes on feedback received from both AI review and at least one human review

**From Day 3:**

- [ ] **Network map** (`network-map.md`) — everyone you could think of, tagged by warmth and excitement, prioritized
- [ ] **Career action log** — every outreach, conversation, and action logged with actual message text
- [ ] **At least 10 career actions taken** — messages sent, conversations had, applications submitted
- [ ] **Blurbs written** — reusable outreach templates for different audiences, including a forwardable blurb for superconnectors

**From Day 4:**

- [ ] **Target company chosen** — one specific company you're spearfishing, with research on what they care about and who you'd send it to
- [ ] **Demo specced** — a tight spec with screens, interactions, data flow, and a clear "aha" moment
- [ ] **Demo in progress** — deployed (even if rough), with the core interaction working
- [ ] **At least 10 career actions logged** for yesterday

If your demo isn't deployed yet, that's your first priority this morning. Get something live before you start polishing. A rough, deployed demo is infinitely more useful than a polished local build that nobody can click.

---

## Part 1: Finish Building

Spend the morning here. You should be done building by early afternoon — you need the rest of the day for recording and the outreach email, and those are non-negotiable.

You should have a working demo from yesterday. Now finish it. The bar is not "production-ready" — the bar is "a busy person can click the link, understand what it does in 30 seconds, and see the main thing work without anything breaking."

### The Polish Checklist

Work through these in order of importance, not in order of fun:

1. **Does the core "aha" moment work reliably?** Open your demo in an incognito window. Click through like a stranger who has 30 seconds. Does the main thing happen? If it breaks, fix that first. Nothing else matters if the demo doesn't work.

2. **Is it instantly legible?** When someone lands on the page, do they know what they're looking at within 5 seconds? If not, add a short headline or tagline that explains what this is. "A tool that does X for Y" — one sentence, above the fold.

3. **Is the happy path smooth?** Walk through the exact sequence of actions you want the viewer to take. Click every button. Fill every input. Make sure nothing is confusing, broken, or dead-ended. If there are features you started but didn't finish, remove them. A clean, small demo beats a cluttered, ambitious one.

4. **Does it look reasonable?** You don't need beautiful design. You need "not embarrassing." Clean layout, readable text, no broken images, no placeholder content that's obviously placeholder. 15 minutes of CSS cleanup goes a long way.

5. **Does it load fast enough?** If there's a loading spinner that lasts more than a few seconds, the person watching might bounce. If you have slow API calls, consider pre-loading data or showing a skeleton state.

### Common Last-Day Traps

- **Spending three hours on a feature nobody will notice** instead of fixing the one thing that's broken on the critical path. Be ruthless about what matters.
- **Redesigning the UI** when the interaction is already clear. Polish is good. Redesign is scope creep.
- **Not testing on mobile.** Your target might open the link on their phone. At minimum, make sure it doesn't completely break on a small screen.
- **Forgetting to handle the empty/error states.** What happens if the API call fails? What does the user see if there's no data? A crashed page kills credibility instantly.

### When to Stop Building

You need to leave enough time to record your video. That's non-negotiable. Set a hard cutoff — if you're still building at 3pm, stop and start recording. A finished video of a 90% demo is worth more than a 100% demo with no video.

---

## Part 2: Record Your Video Walkthrough

This is the most important deliverable of the day. The video is what you'll actually send to people. It's the medium they'll consume it in — async, on their phone, in a browser tab between meetings. A live demo to classmates is not the same thing. This video needs to stand on its own.

Don't overthink the recording. You're not making a YouTube tutorial. You're making a personal, async pitch — the equivalent of sitting across from someone at a coffee shop and saying "let me show you what I built for you." If it feels a little rough, a little human, that's fine. That's better than over-polished. The person watching it should feel like a real person built this for them, not like they're watching a product demo from a company with a marketing team.

### What the Video Should Cover

Keep it to **2-3 minutes**. Shorter is fine. Longer is not — if you go past 3 minutes, you're losing them. Every second needs to earn its place.

The structure:

1. **The hook (10-15 seconds)** — Who are you, and what did you build? "Hey, I'm [name]. I built [thing] — a [one-sentence description] for [company name]." That's it. Don't spend a minute on your background. They can read your LinkedIn if they care.

2. **The "why" (15-20 seconds)** — Why this company? What problem did you notice, or what opportunity did you see? This is where you demonstrate that you actually understand their product and their users. "I noticed that [specific observation about their product/users]. So I built [thing] to [solve that / explore that / extend that]."

3. **The demo (60-90 seconds)** — Show the thing working. Screen-share your deployed demo and walk through the core interaction. Narrate what's happening: "When a user does X, they see Y, which is interesting because Z." Don't explain your code. Don't talk about your tech stack unless it's directly relevant to why the demo is impressive. Show the "aha" moment clearly.

4. **The connection (15-20 seconds)** — Why does this matter to them specifically? "I built this because I'm excited about [what they're doing] and I wanted to show what it would feel like to have me working on [their product / their problem space]." This is where you make it personal.

5. **The close (10 seconds)** — "I'd love to chat about this. My email is [email]. Thanks for watching." Done.

### Get AI Help Writing Your Script

Before you hit record, get your talking points tight. You don't need to read from a script word-for-word — that'll sound stiff. But you need to know exactly what you're going to say in each section so you don't ramble.

---

> Read my journal/reflection artifacts, my marketing questions answers (`marketing-questions.md`), my elevator pitches, and any notes or specs I have about my spearfish project.
>
> I'm about to record a 2-3 minute video walkthrough of my spearfish project to send to [COMPANY NAME]. Here's what I built:
>
> [Describe your demo — what it does, what the core interaction is, what the "aha" moment is]
>
> And here's why I targeted this company:
>
> [Your reasoning — what you noticed about their product, what problem you saw, why you're excited about them]
>
> Help me write a tight script for my video walkthrough. The structure should be:
>
> 1. **Hook (10-15 seconds)** — Who I am and what I built. One sentence each. No throat-clearing.
> 2. **Why this company (15-20 seconds)** — What I noticed about their product or users that led me to build this. Should demonstrate genuine understanding, not surface-level research.
> 3. **Demo walkthrough (60-90 seconds)** — A narrated walk through the core interaction. Write this as if I'm screen-sharing and talking someone through what they're seeing. Focus on the user experience and the "aha" moment, not the code or the tech stack.
> 4. **The connection (15-20 seconds)** — Why this matters to them. Why it demonstrates what I'd bring to their team. This should connect back to my actual strengths and interests from my journal and marketing questions — not generic "I'm passionate about your mission" language.
> 5. **Close (10 seconds)** — Clear call to action. Email, availability, done.
>
> The tone should be: conversational, confident, genuine. Not salesy. Not overly casual. Like I'm showing something I'm proud of to someone I respect.
>
> Also flag anything about my plan that seems off:
> - Is my "aha" moment actually compelling, or am I overselling something mundane?
> - Am I talking about the right things for this specific audience, or am I defaulting to what I find interesting rather than what they'd find interesting?
> - Is there anything I should cut because it weakens the pitch?
>
> ultrathink

---

### Recording Tips

- **Use Loom, OBS, or your OS screen recorder.** Loom is easiest — it handles screen + camera and gives you a shareable link. But anything that captures your screen and your voice works.
- **Show your face** if possible (Loom's picture-in-picture works well for this). People connect with people, not disembodied voices. But if showing your face makes you self-conscious and it's hurting your delivery, skip it. Confident audio-only beats nervous face-cam.
- **Record in one take if you can.** A slightly imperfect single take feels more authentic than a heavily edited production. If you stumble, just pause and re-say the sentence. Don't start over unless you completely lose the thread.
- **Watch your recording before you share it.** Make sure the audio is clear, the screen is readable, and the demo actually works in the recording. If the text is tiny or the clicks are hard to follow, zoom in or increase your font size and re-record.
- **If you hate your first take, do a second.** But don't do ten. Diminishing returns hit fast. Two takes is usually enough — the first one gets the nerves out, the second one is the keeper.

---

## Part 3: Write the Outreach Email

You have a deployed demo and a video. Now write the email that delivers them. This is the spearfish landing — everything you've built this week comes together in one message.

### The Email Structure

- **Subject line:** Short, specific, intriguing. Not "Job Application" or "Reaching Out." Something like: "Built something for [Company] — quick demo" or "[Specific thing you built] for [their product]."
- **Body:** 3-5 sentences max. Who you are (one sentence). What you built and why (one sentence). Link to the video. Link to the live demo. Clear ask ("Would you be open to a quick call?"). That's it.
- **Don't attach your resume.** If they want it, they'll ask. The demo IS your resume for this interaction.

### Get AI Help on Your Email

---

> Read my journal/reflection artifacts, my elevator pitches, my marketing questions answers (`marketing-questions.md`), and any notes or specs I have about my spearfish project.
>
> I've finished my spearfish project for [COMPANY NAME] and recorded a video walkthrough. Now I need to write the cold outreach email that delivers it.
>
> Here's what I know about the recipient:
>
> [Who you're sending it to — name, role, anything you know about them]
>
> Here's the video link: [link]
> Here's the live demo link: [link]
>
> Write me 2-3 versions of this email. Each should be:
>
> - **5 sentences or fewer.** Busy people don't read long emails from strangers.
> - **Specific to this person and company.** Not a template that could go to anyone.
> - **Focused on what I built, not on me.** The demo does the selling. The email just needs to get them to click the link.
> - **Clear ask.** What do I want them to do after watching? A call? A reply? Be specific.
>
> For each version, tell me what's different about the approach and when I might prefer one over the other (e.g., if I have a warm intro vs. cold, if the recipient is a founder vs. a hiring manager).
>
> Also: is my subject line doing enough work? Give me 3-5 subject line options that would make this person actually open the email.
>
> ultrathink

---

Don't send the email today unless you're confident everything is ready. It's better to send a polished email Monday morning than a rushed one Friday evening. But have it drafted and reviewed before you leave today.

---

## Keep Networking

Spearfishing doesn't replace networking — it runs alongside it. Don't let the build consume your entire day without sending a single message.

**Today's targets:**

- [ ] At least 10 career actions logged (messages sent, conversations had, follow-ups, etc.)
- [ ] Career action log updated through today
- [ ] Follow up on any unanswered messages from earlier this week — the longer you wait, the colder they get
- [ ] If your spearfish target company has anyone in your network, reach out to them today. A warm intro + a spearfish demo is the most powerful combination in your toolkit.

If you're deep in the build, batch your outreach: 30 minutes in the morning, 30 minutes in the evening. The build is a single bet on a single company. The network is the thing that creates all the other opportunities.

---

## What "Done for Today" Looks Like

By the end of today, you should have:

- [ ] A **deployed, working spearfish demo** — polished enough that a stranger can click through and understand it in 30 seconds
- [ ] A **recorded video walkthrough** (2-3 minutes) — shareable link ready to send
- [ ] A **drafted outreach email** — ready to send or ready for one final review before sending Monday
- [ ] **At least 10 career actions logged** for today
- [ ] **Career action log updated** through today

If you have all five, you're in great shape for tomorrow's career report. If you're missing the video, that's your top priority — everything else is secondary.

*System design recitation may be scheduled during this day.*

---

## Preparing for Tomorrow

Tomorrow is Career Report & Peer Review day. You'll present a printed report showing everything you did this week. Start thinking about it now so you're not scrambling in the morning.

Your report should include:

1. **QR codes** linking to all your professional surfaces (LinkedIn, personal website, GitHub, resume)
2. **Your career action log** — every outreach, conversation, and action from this week, with actual message text and funnel data
3. **Your spearfish** — link or QR code to the video walkthrough and live demo
4. **Graphs and data** — visualize your activity: messages sent, conversations had, follow-ups, responses received

This is proof of work. The volume matters. If you took 50+ career actions this week, that shows up. If you took 8, that shows up too.

Make sure all your artifacts are committed, pushed, and accessible. If your LinkedIn is set to private, fix that. If your personal website is down, fix that. Tomorrow, people will be clicking through everything.

---

## Appendix: Resources

- [Spearfishing guide](https://github.com/fractal-nyc/bootcamp-monorepo/tree/main/career/spearfishing) — the full spearfishing framework (Steps 0-5)
- [Andrei's ElevenLabs spearfish example](https://github.com/fractal-nyc/bootcamp-monorepo/blob/main/career/spearfishing/andrei_11labs_example.md) — a real spearfish email that got to final-round interviews
- [ApplyAll spearfish example](https://github.com/fractal-bootcamp/spearfishes/tree/main/applyall) — a full worked example
- [The Fractal Job Hunt Strategy](https://github.com/fractal-nyc/bootcamp-monorepo/blob/main/advice/career/README.md) — how spearfishing fits into the broader pipeline
- [Loom](https://www.loom.com/) — free screen + camera recording with shareable links
- [Job search algorithm](https://github.com/fractal-nyc/bootcamp-monorepo/blob/main/career/job_search_pipeline.md)
- [Career advice and job boards](https://github.com/fractal-nyc/bootcamp-monorepo/blob/main/advice/career1.md)
- [Sales consultancy mindset for engineers by Genesis Dayrit, Fa2025](https://www.youtube.com/watch?v=ae0PTs6GB3E)
- [YouTube video title strategy](https://creatorhooks.com/past-creator-hooks-newsletters/)
- [Jeong Yoon Fa2025 viral demo](https://www.instagram.com/p/DU71RrAEYt4/)
