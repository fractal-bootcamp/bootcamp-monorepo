# Day 2: Sharpen Everything with Claude

Yesterday you did the hard work of figuring out who you are, what you want, and where the gaps are. Today you're going to use Claude as a thinking partner to refine, pressure-test, and operationalize all of it.

**This isn't a one-time exercise.** The prompts in this document are designed to be run again — after you ship something new, after a round of interviews teaches you what questions you can't answer yet, after you realize the role you thought you wanted isn't the one you actually want. Your journal, your pitch, your audit — these are living documents. As you gain experience and contact with reality, come back here and run the prompts again. The process gets more valuable each time because you have more to work with.

This document is a series of prompts. Each one builds on the last. Open Claude Code from inside your career starter repo and work through them in order.

## Before you start

Make sure all of your work from yesterday is committed and pushed to your repo. You should have:

- Your **journal/reflection** artifacts from Part 1
- Your **elevator pitch** document with all four versions (5 seconds, 30 seconds, 60 seconds, 5 minutes) from Part 2
- Your **audit** document (`.md` file with sections for LinkedIn, personal website, resume, and GitHub) from Part 3

If you also have your resume as a file in the repo (PDF or otherwise), that'll be useful later. If not, add it now.

## Prompt 1: The Check-In

Start a Claude Code session from your repo directory. Give Claude the following prompt (adjust the file names/paths if yours are different):

---

> Read through all the files in this repo. This is my career starter repo for an AI Accelerator program. I should have the following artifacts from yesterday's work:
>
> **Journal/reflection** — Freeform writing covering these topics:
>
> 1. Who am I? (my story, major decisions, what I've learned about myself)
> 2. What can I do? (projects, skills, strengths, what's impressive about my work)
> 3. What can I offer right now? (what I bring day one, my edge, my limits)
> 4. Where do I want to go? (next chapter, what kind of work/environment I want)
> 5. How do I want to grow? (gaps to close, what kind of growth matters most)
> 6. Where do I belong? (what kind of org/team/role fits, specific companies if any)
>
> **Elevator pitch** — Four versions of how I explain myself:
>
> 1. 5 seconds (one sentence)
> 2. 30 seconds (a few sentences)
> 3. 60 seconds (a short paragraph)
> 4. 5 minutes (the full picture)
>
> **Audit** — A review of my professional surfaces, where each item is marked Good, Gap, or Misaligned:
>
> _LinkedIn:_
>
> - Headline
> - About section
> - Experience descriptions
> - Skills list
> - Profile photo
>
> _Personal website:_
>
> - Identity
> - Contact info
> - Links to other surfaces
> - Core story on homepage
> - Projects page (with write-ups, live links, code links)
> - Vibes check (no construction sites, no ghost towns)
>
> _Resume:_
>
> - One page
> - Content matches my story
> - Impact-focused bullets
>
> _GitHub:_
>
> - Profile README
> - Pinned repos
> - Project READMEs
>
> Go through everything I have and tell me:
>
> 1. Which of these artifacts are present and which are missing?
> 2. For the ones that are present, are there any sections or topics that seem thin, skipped, or only half-addressed?
> 3. Don't sugarcoat it. If something is missing or weak, say so directly.
>
> ultrathink

---

If Claude flags anything as missing or incomplete, go fill it in before moving on. The rest of today's prompts build on having a complete foundation. No point sharpening something that isn't there yet.

## Prompt 2: Pressure-Test Your Materials

Now that everything exists, we're going to stress-test it. You'll run three separate prompts — one for each artifact — and Claude will evaluate your work from two perspectives:

**Persona A — The Technical Recruiter.** They're not an engineer. They're a seasoned recruiter whose job is to read hundreds of candidates and decide who's worth putting in front of a hiring manager. They read fast. They're pattern-matching on narrative clarity, role fit, and red flags. They need to walk away able to pitch you to someone in two minutes. If your story is muddled, if your positioning is vague, if they can't figure out what role you'd slot into — you don't get forwarded.

**Persona B — The Engineering Hiring Manager.** They're technical. They've built and shipped things. They've hired engineers who turned out great, and engineers who turned out to be a mistake. They read for signal. They want to know what _you_ specifically did, not what your team did. They want to see evidence of real problem-solving — hard tradeoffs, debugging war stories, architecture decisions you'd defend. They're allergic to vague claims and inflated scope. They're also looking for self-awareness: do you know what you're good at, what you're not, and where you want to grow? They're deciding whether they'd want you on their team.

The goal isn't to get a grade. The goal is to find the weak spots so you can fix them before a real recruiter or hiring manager sees them.

### Prompt 2a: Journal Review

Your journal is the raw foundation. It's not something you'd hand to a recruiter — but the depth and clarity of your thinking here determines the quality of everything else. If your journal is vague, your pitch will be vague. If you're hand-waving on what you actually built, your resume will hand-wave too.

---

> Read my journal/reflection artifacts. Evaluate them against the rubric below from two perspectives. For every criterion, tell me whether my writing satisfies it, partially satisfies it, or doesn't address it — and quote the specific parts that are strong or weak.
>
> **Persona A — Technical Recruiter:**
>
> A recruiter who reads this should be able to extract the following. Can they?
>
> 1. **Narrative clarity** — Is there a clear career arc? Could someone summarize your story in two sentences after reading this? Or is it a collection of disconnected facts?
> 2. **Role targeting** — Is it obvious what kind of role you're looking for? Job title, company stage, team size, domain? Could a recruiter read this and immediately think of specific openings to match you to?
> 3. **Value proposition** — Is there a clear answer to "why should a hiring manager take this call?" Not just "I'm a good engineer" — what specifically makes you worth their time?
> 4. **Red flags** — Are there unexplained gaps, contradictions, or things that would make a recruiter hesitate? Jumpy timelines, vague descriptions of what you did, bad-mouthing previous employers, being unable to articulate what you want?
> 5. **Proof points** — Are there concrete accomplishments a recruiter could put in a submission email? Numbers, outcomes, shipped products, problems solved? Or is everything abstract?
>
> **Persona B — Engineering Hiring Manager:**
>
> A hiring manager who reads this should see the signal of a real engineer. Do they?
>
> 1. **Technical specificity** — When you describe projects, do you name the actual technologies, describe the architecture, explain what was hard? Or do you stay at the level of "I built a web app"?
> 2. **Individual contribution** — Is it clear what YOU did vs. what the team did? A hiring manager has heard "we built X" a thousand times. They want to know what decisions you personally made, what code you personally wrote, what problems you personally debugged.
> 3. **Problem-solving evidence** — Do you describe the _hard parts_? The tradeoffs, the things that broke, the approaches you tried that didn't work before you found the one that did? This is the difference between someone who built something and someone who just says they did.
> 4. **Self-awareness and honesty** — Are your stated strengths credible and specific? Are your weaknesses real or are they the "I work too hard" kind? Does a hiring manager come away trusting your self-assessment, or doubting it?
> 5. **Growth trajectory** — Can they see increasing scope and complexity over time? Is there evidence you can operate at the level you're targeting, or just at the level you've been at?
> 6. **Collaboration signal** — Is there any evidence of how you work with other people? How you handle disagreement, how you communicate technical decisions, how you operate on a team?
>
> After the evaluation, give me a prioritized list of the 3-5 most important things to strengthen. For each one, tell me specifically what's missing and what a strong version would look like. Then help me revise.
>
> ultrathink

---

Work through Claude's feedback. Revise your journal until you're satisfied with it, then move on.

### Prompt 2b: Elevator Pitch Review

Your pitches are the most distilled version of your story. These are the words you'll actually say out loud — at a networking event, on a recruiter call, in the first minute of an interview. They have to work.

---

> Read my elevator pitch document (all four versions: 5-second, 30-second, 60-second, and 5-minute). Evaluate each version against the rubric below from two perspectives. Quote the specific language that's working or not working.
>
> **Persona A — Technical Recruiter:**
>
> 1. **Memorability (5-second)** — If a recruiter met 20 people at a networking event and heard this one sentence, would they remember you the next day? Is it specific enough to stick, or is it generic enough to describe anyone?
> 2. **Forwardability (30-second)** — Could a recruiter copy-paste this into a Slack message to a hiring manager and have it land? Does it answer "who is this person, what do they do, why should I care?" in a way that makes the hiring manager want to take the call?
> 3. **Cover letter energy (60-second)** — Does this version tell a story with enough texture that someone wants to keep reading? Does it make the candidate feel like a real person with a real trajectory, or does it read like a template?
> 4. **Pitch readiness (5-minute)** — After hearing this, could a recruiter confidently submit you for specific roles? Do they know your story, your strengths, your target, and your differentiator? Or do they still have basic questions?
> 5. **Consistency across lengths** — Do all four versions feel like the same person? Each should be a zoom level of the same story, not four different pitches.
>
> **Persona B — Engineering Hiring Manager:**
>
> 1. **Technical credibility** — Do the pitches contain enough technical signal that a hiring manager takes you seriously? You don't need to list your whole stack, but there should be enough specificity that they can tell you're real. "I build web apps" vs. "I build real-time collaborative tools" — one lands, one doesn't.
> 2. **Differentiation** — What makes you different from the other 50 candidates this hiring manager is evaluating? Is it in the pitch, or is it missing? If you removed your name, could this describe anyone?
> 3. **Honest calibration** — Do the claims feel right-sized? A hiring manager who's been doing this for years can smell inflation. Are you describing yourself at a level that matches your actual experience?
> 4. **Follow-up hooks** — Especially in the 60-second and 5-minute versions: are there specific things a hiring manager would want to dig into? Interesting projects, unusual decisions, hard problems? These hooks are what turn a screening call into a real conversation.
> 5. **Signal-to-noise ratio** — Is every sentence earning its place? Especially in the shorter versions, is there filler? Throat-clearing? Adjectives doing the work that evidence should be doing?
>
> After the evaluation:
>
> 1. Rewrite each version that needs it. Show me the before and after.
> 2. For each rewrite, explain what you changed and why.
> 3. Make sure the four versions still feel like zoom levels of the same story.
>
> ultrathink

---

Iterate with Claude until all four versions are tight. Read them out loud — if they don't feel natural coming out of your mouth, they need more work.

### Prompt 2c: Audit Review

Your audit was a self-assessment of your professional surfaces. Now we're going to check whether your self-assessment is actually calibrated. It's easy to mark something "Good" when it's really just "present." It's also easy to be too hard on yourself and miss things that are already working.

---

> Read my audit document. For each surface (LinkedIn, personal website, resume, GitHub), evaluate whether my self-assessment is calibrated. Use the rubric below.
>
> **Persona A — Technical Recruiter:**
>
> A recruiter is going to look at these surfaces before they ever talk to you. For some, these surfaces ARE the first impression. Evaluate my audit:
>
> 1. **LinkedIn — Headline and About section** — These are the highest-leverage items. I may have marked them "Good," but would a recruiter actually agree? A "Good" headline is not just a job title — it's a positioning statement. A "Good" About section is not just present — it's a 30-second pitch that makes a recruiter want to keep reading. If I marked these "Good" but they're actually just adequate, flag that.
> 2. **LinkedIn — Experience descriptions** — Did I assess these honestly? "Good" means each role has bullets that describe impact, not just responsibilities. A recruiter skims these in seconds — do they pop?
> 3. **Resume — Story coherence** — I assessed whether the content matches my story from Part 1. But does it? Pull up my journal and my pitch and cross-reference. Are there things in my journal that should be on my resume but aren't? Is my resume telling the same story as my pitch?
> 4. **Overall surface coherence** — A recruiter might look at LinkedIn, then your website, then your GitHub. Does my audit catch inconsistencies between surfaces? Same story everywhere, or different versions of yourself?
>
> **Persona B — Engineering Hiring Manager:**
>
> A hiring manager is going to look at your GitHub and possibly your personal website with a more technical eye. Evaluate my audit:
>
> 1. **GitHub — Profile README** — I may have marked this "Good" or "Gap." But what does "Good" actually mean here? A hiring manager wants to see: what you're working on, what you care about, and evidence that you actually write code. If I marked it "Good" but it's just a template with some badges, that's not good.
> 2. **GitHub — Pinned repos and READMEs** — This is where a hiring manager actually evaluates you. Are the pinned repos your best work? Do the READMEs explain what the project is, why it exists, how to run it, and what technical decisions you made? Did I assess this rigorously or did I just check whether a README file exists?
> 3. **Personal website — Projects page** — A hiring manager clicking through your projects is looking for depth. Did my audit evaluate whether the write-ups demonstrate technical thinking, or just whether they're present?
> 4. **Resume — Impact specificity** — I assessed whether bullets describe impact. But did I really pressure-test that? "Improved performance" is not impact. "Reduced p95 latency from 800ms to 120ms by restructuring the query layer" is impact. Did my audit catch the difference?
>
> After the evaluation:
>
> 1. For each item where my self-assessment is miscalibrated (either too generous or too harsh), tell me what the real assessment should be and why.
> 2. Give me a prioritized list of the top 3-5 fixes that would make the biggest difference to each persona.
> 3. For each fix, be specific: don't just say "improve your LinkedIn headline" — tell me what's wrong with it and what a strong version looks like, based on what you know about me from my journal and pitch.
>
> ultrathink

---

This one might be uncomfortable. That's the point. Better to find out now that your self-assessment was off than to find out when a recruiter passes on you.

After working through Claude's feedback, go update your audit to reflect the recalibrated assessments. Then start closing the new gaps it identified — update the actual surfaces (LinkedIn, GitHub, website, resume) before moving on.

---

## Appendix: Resources

- [Job search algorithm](https://github.com/fractal-nyc/bootcamp-monorepo/blob/main/career/job_search_pipeline.md)
- [Fractal Tech resume advice and Claude prompt](https://github.com/fractal-nyc/bootcamp-monorepo/tree/main/advice/resume)
- [Resume/CV Claude interview prompt](https://github.com/fractal-nyc/bootcamp-monorepo/blob/main/career/ELITE_CV_TRANSFORMATION.md)
- [Career advice and job boards](https://github.com/fractal-nyc/bootcamp-monorepo/blob/main/advice/career1.md)
- [Spearfishing guide](https://github.com/fractal-nyc/bootcamp-monorepo/tree/main/career/spearfishing)
- [Visakanv: 13 Questions I Ask My Marketing Clients](visakanv-marketing.md)
- [Sales consultancy mindset for engineers by Genesis Dayrit, Fa2025](https://www.youtube.com/watch?v=ae0PTs6GB3E)
