---
title: "AI Hackathon: Lessons Learned from Building a Zombie Survival Game"
excerpt: "A deep dive into my experience at an AI Hackathon, where I built a playable zombie survival game using Agentic AI. Learn from my planning, execution, and the surprising power of AI in game development."
image: /images/software-blog/194-lessons-ai-hackethon/zombie-survival-game-dark-forest-level.png
slug: /software-blog/building-game-ai-hackathon-lessons/
tags:
    - technical
    - ai
    - hackathon
    - game-development
publishDate: 2025-08-16T11:01:22.025566
gpt: chatgpt url
trello: ""
seo_keywords: "AI hackathon, game development, agentic AI, claude code, zombie survival game, software development, vercel, pair programming with ai"
seo_descriptions: "Discover the key takeaways from participating in an AI hackathon. This post covers everything from idea validation and planning to execution and the future of coding with Agentic AI, based on the experience of building a zombie survival game."
---

I participated in an AI Hackathon at my current workspace, [Real Brokerage: REAX](https://www.joinreal.com), in June 2025. With the rise of AI tools like Claude Code, our leadership organized the hackathon to help employees understand the current state of Agentic AI.

Having used tools like Cursor before, I had certain expectations for Claude Code's performance. I anticipated getting stuck in places and needing to intervene manually. However, the outcome of the hackathon fundamentally changed my perspective on the potential of Agentic AI.

The final result is a playable zombie survival game, which you can try here: [ankush-ai-hackethon-2025.vercel.app](https://ankush-ai-hackethon-2025.vercel.app). (If you are playing: Assume you are throwing a bomb instead of firing a gun. Mute on Level 4 Dark Forest)

## Planning for the Hackethon

### Deciding on the Idea

The challenge was to build something ambitious that we wouldn't normally tackle. I decided that creating a video game would be a fitting challenge, especially since I had no prior experience in game development.

![zombie-survival-menu](/images/software-blog/194-lessons-ai-hackethon/zombie-survival-game-menu.png)

### Validating the Idea

I prototyped my idea using Claude Code to create me a desktop game. And it did create a few games. Those were very simple 2D games which I liked.

I showed it to one of my collegue who suggested to me to add computer generated
sound. And it did.

The Claude Web game was a single HTML file, which I knew wouldn't be scalable for the hackathon. I researched game development best practices and code structure. The videos were big. Later, I simply asked Claude Web to give me a good structure. This made me realize that I just need to ask Claude to build with a good structure in mind during the Hackethon.

My vision was a multiplayer zombie survival game. I researched serverless options for multiplayer functionality and found a few viable services.

### Optimizing for Speed

To accelerate development, I decided to focus exclusively on the frontend and skip the backend entirely. I bookmarked a Vercel template link to quickly set up a deployment environment.

## During the Hackethon

The hackathon started, and within 30 seconds, I had a repository cloned from Vercel and ready for deployment.

I created a `prompts` folder to store and share my prompts, a technique I had seen in a video. It would be fun to share prompts used with others. To speed up prompting, I used Mac's voice dictation, which allowed me to create detailed prompts quickly.

I provided all my requirements upfront, including coding guidelines, step-by-step instructions, and requirements for parallelizing tasks across multiple agents. The output was a Product Requirements Document (PRD) and an `EXECUTION_PLAN`. These two documents guided the entire development process.

I began by feeding steps from the `EXECUTION_PLAN` into Claude. I maintained a tight feedback loop: generate with Claude, then verify the output in the browser.

![zombie-survival-game-level-selector](/images/software-blog/194-lessons-ai-hackethon/zombie-survival-game-level-selector.png)

After about 15 steps, I was ready to parallelize the work. I asked Claude to check for potential merge conflicts and then to create three separate folders with prompts for three different "agents."

I manually created three Git worktrees, and in each, I executed the steps for one agent. Each worktree had its own VS Code and Chrome instance for isolated testing. Once an agent's tasks were complete and verified, I committed the changes.

When all agents had finished, I had Claude merge the work. I tested the integrated game and provided feedback for bug fixes, which Claude resolved.

![level-1-of-zombie-survival-game-built-with-claude-code](/images/software-blog/194-lessons-ai-hackethon/level-1-of-zombie-survival-game-built-with-claude-code.png)

I continued this cycle of sequential and parallel development. My deployment pipeline broke at one point due to TypeScript's strict mode. My mistake was asking Claude to fix it by providing the error output. This took over 30 minutes and didn't resolve all the issues. As a developer, I knew I could have saved time by simply disabling strict mode.

Despite this hiccup, I submitted the project just five minutes before the deadline.

## Conclusion

The outcome of the game I built with Claude Code has changed my mind on the possibility of AI in development. I do feel confident that they can be a good partner in coding.

While my experience with Claude Code in regular development has been slower and less polished than in the "vibe-coded" environment of the hackathon, I am convinced that Agentic AI is "part" of the future.

I will share more about my AI-assisted coding workflow in an upcoming blog post.

---
*Disclaimer: Gemini was used to improve the readability of this article, but the content is my own.*
