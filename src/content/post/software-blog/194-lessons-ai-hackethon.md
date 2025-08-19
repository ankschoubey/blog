---
title: DRAFT - Lessons from my first AI Hackethon
excerpt: I participated in AI Hackethon at Real Brokerage
slug: /software-blog/building-game-ai-hackathon-lessons/
tags:
    - technical
publishDate: 2025-08-16T11:01:22.025566
gpt: chatgpt url
trello: ""
seo_keywords: 
seo_descriptions: 
---

**Regarding Draft**: This post has been published before it is ready. I believe in Continious Delivery. Care has been taken to ensure the information published is still applications. Examples and other refinements will be added overtime. 

I participated in an AI Hackethon at my current workspace ([Real Brokerage: REAX](https://www.joinreal.com)) in June 2025.

As Claude Code and other AI tools are coming up, we needed to be updated on it. The leadership at the company decided it would be good to have a Hackethon as a way for employees to understand what the current state of Agentic AI is.

I had used Cursor before, and I expected Claude Code to have a similar performance. I also expected, Claude Code to get stuck at some parts and that I would have to jump in. The outcome of the hackethon has changed my views on the potential of Agentic AI. 

I share more of my thoughts in the conclusion.

-- Planning for the hackethon --

## Planning for the Hackethon

### Deciding on Idea
The goal of the challenge was to try to build something big that we would not usually code up and this was communicated. So, I thought maybe making a video game would be a good idea!

I have never created a video game before. So this would be a real challenge

### Validating the Idea

I prototyped by idea using Claude Code to create me a desktop game. And it did create a few games. Those were very simple 2D games which I liked.

I showed it to one of my collegue who suggested to me to add computer generated sound. And it did. 

The game that Claude Web built was all in a single HTML file, I recognized that this won't be ideal for the hackethon. So, I researched how games are built, what code structure is followed, etc. The videos were big. Later, I just asked Claude Web for how to structure and it gave a good output. This made me realize that I just need to ask Claude to build with a good structure in mind during the hackethon.

I wanted my game to be a Zombie Survival with multiplayer capability. I did research about how to do this without a server and I found a few services.

### Optimizing Speed

I bookmarked Vercel template link so that I can quickly spin up a deployment environment.

## During the Hackethon

As soon as the hackethon started, I created a clone of repository on Vercel and downloaded it. Meaning the environment for deployment for ready within the first 30 seconds.

I then created a prompts folder. I realized that it would be fun to share what prompt I am writing with others and improve it. I had seen a video where people keep their prompts in folders. So, I did the same.

To speed up prompting, I had setup a Keyboard shortcut to open Mac's voice dictation. This allowed to be give a really big good prompt.

I have all my requirements, including guidelines about how to code, how to structure steps, requirement to organize steps such that they can be parallelized by multiple agents, etc.

The output was a `PRD` and `EXECUTION_PLAN`. 

These files were very important. Throughtout the rest of the coding I did not give any other requirements.

Now I started by copying steps from `EXECUTION_PLAN` and pasting them in a different prompt file and passing the file to Claude.

This creating a simple app. I kept, VS Code and Browser to the side. As soon as Claude did something I tested it. This was my Generation <-> Human Verification Loop. 

After 15 steps, it was time to go parallel.only. I asked claude to ensure that will there be merge conflicts if I go parallel. It did some research. Then I asked it to create 3 folders with prompts for each of the agents. And it did.

I created 3 worktrees manually. And within each worktree, I executed of the steps. That was created by main claude. 

I had one VS Code and Chrome pair open for each of the worktrees. As soon as an agent was completed, I would test and if it was right commit.

Eventually, all agent's tasks were completed and I asked Claude to merge. After merge, I tested the game again. And gave changes and problems. It resolved it all.

I went back to doing sequential tasks and after some steps did some tasks in parallel again with the same system the only difference was I asked claude to create worktrees.

My deployment pipeline had broken after the first few steps because of typescript strict more. The mistake that I did was I asked Claude to fix it by providing the output. This tool over 30 minutes and still had a few errors left. As a developer, I knew I could just disable the strict mode. And I should have done that.

Luckily I was able to submit about 5 minutes before the End of Hackethon.




My idea of the haathon was to create an AI generated zombie survival game.

Before the hackethon, I was clean on what my idea was. I talked to Claude and did a quick prototype to understand the boundaries of it.

I also experimenting with adding different things to the site. 

This experiment also helped me understand the boundaries of what claude can do and also realized where it went wrong. 

While showing this prototype a friend/collegue suggested adding sounds which claud did.

I also decided to skip backend entirely and focus only on the frontend to speed up deployment.

Also, I realized I would have to type a lot. To speed up. I decided to voice dictation, which would help me speed up dramatically. I set voice dictation up to the key double press on my computer.

I had also read and listen to a few podcasts and blogs where I had of handedly gained some information:
• agents can work in parallel
• you can write things in a file and drag the file into LLM

So, before the hackethon I was prepared with:
• an idea that I had potential POC
• bookmark to quickly deploy on vercel
• a plan for how I am going to do it.
• etc
After the Hackathon
• What's changed in how you code?
• What Claude added? What Cursor lacked?
• Multi-agent thinking: how did it emerge?
Developer Systems I Built
• Prompt directory
• Dictation
• Chrome + Claude rapid test loop
• Claude for PRDs → Plans → Prompts
Final Thoughts
• What worked well?
• What surprised you?
• What would you reuse next time?

## Conclusion

The outcome of the game I built with Claude Code has changed my mind on the possibility of AI in development. I do feel confident that they can be a good partner in coding.

While working with Claude Code in actual development, I did find it to be slower and not as polished as in hackethon which was Vibe Coded.

If you have never used Agentic AI, I suggest making the switch. I believe Agentic AI is the future of coding. The way we code is changing.

I will share more on how I code in an upcoming blogpost.
