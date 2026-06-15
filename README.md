> **Demo notice:** This is a portfolio project intended for demonstration purposes only. Do not enter sensitive, confidential, or personally identifiable information. API keys are not stored but are held in browser memory for the duration of your session.

# Intro to Claude Code

An interactive guide to Claude Code for developers who are new to AI coding agents, with a focus on terminal and enterprise use. Built to look and feel like the Claude Code desktop interface.

**Try it out here. API Key required for use.** https://jtennant324.github.io/IntroToClaudeCode/

---

## What it does

This tool is designed for developers who have heard of Claude Code but aren't sure how to get started, especially in a corporate or enterprise environment where the CLI is the most common deployment. It answers common questions about installation, daily use, slash commands, tokens, and best practices in a conversational format.

Users can:

- Click pre-built questions organized by category in the sidebar — Getting Started, Day-to-Day Use, Slash Commands, Enterprise, Tokens, and Tips & Limits
- Ask their own questions in a free-text input at the bottom
- Follow dynamically generated suggested questions at the end of each response to keep exploring naturally
- View annotated terminal mockups showing what Claude Code actually looks like when running in PowerShell or Terminal, including the welcome screen and permission prompts

---

## What it demonstrates

- **Prompt engineering** — a carefully designed system prompt that controls tone, accuracy, response format, and behavior, including hardcoded accurate installation commands per platform and structured JSON output for dynamic follow-up questions
- **Anthropic Claude API integration** — real-time API calls using the `/v1/messages` endpoint with full conversation history maintained across the session
- **Structured JSON output parsing** — the model is instructed to return JSON containing both the answer and three contextual follow-up questions, which are parsed and rendered as interactive buttons
- **Markdown rendering** — assistant responses are parsed and rendered as formatted HTML using marked.js, including code blocks, bullet points, numbered lists, and bold text
- **UI design mimicking a real product** — the interface replicates the visual structure of the Claude Code desktop application, including sidebar navigation, breadcrumb header, message layout, and action bar
- **Terminal mockups** — inline CSS-rendered mockups of the Claude Code terminal welcome screen and permission prompt, accurate to the real CLI experience

---

## How to run it locally

1. Clone the repo
2. Open `index.html` using a local server (VS Code Live Server works well)
3. Enter your Anthropic API key when prompted: https://console.anthropic.com
4. Your key is never stored and exists only in memory during the current session

> Note: Opening `index.html` directly as a `file://` URL will not work because of browser CORS restrictions. Use a local server instead.

---

## Tech stack

- HTML, CSS, JavaScript (vanilla, no frameworks)
- Anthropic Claude API (`claude-sonnet-4-6`)
- marked.js (markdown rendering)
- Tabler Icons (icon font)
- JetBrains Mono + Inter (Google Fonts)
- Hosted on GitHub Pages

---

## Project context

Built as part of a portfolio demonstrating hands-on experience with the Anthropic Claude API, prompt engineering, and AI platform adoption. Designed with enterprise developers in mind — specifically those being introduced to Claude Code in a corporate environment where the terminal CLI is the standard deployment method.
