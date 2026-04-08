# Discord Meme Bot (Node.js + discord.js)

A production-ready Discord bot that serves memes with slash commands, embeds, cooldowns, logging, and robust error handling.

## Features

- Slash commands:
  - `/meme` (with optional `category`)
  - `/ping`
  - `/help`
  - `/userinfo`
- Meme fetching from [meme-api.com](https://meme-api.com)
- Category support (General, Dank, Wholesome)
- Per-user command cooldowns (anti-spam)
- Structured logging
- Embed-based rich UI responses
- Environment variable configuration

## Project Structure

```text
.
├── src
│   ├── commands
│   │   ├── help.js
│   │   ├── meme.js
│   │   ├── ping.js
│   │   └── userinfo.js
│   ├── utils
│   │   ├── cooldowns.js
│   │   ├── logger.js
│   │   └── memeApi.js
│   ├── deploy-commands.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## Requirements

- Node.js 18.17+ (or newer)
- A Discord application and bot token

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Then fill in:
   - `BOT_TOKEN`
   - `CLIENT_ID`
   - optional `GUILD_ID` (recommended for faster dev command updates)

3. Deploy slash commands:

   ```bash
   npm run deploy-commands
   ```

4. Start the bot:

   ```bash
   npm start
   ```

## Notes

- If `GUILD_ID` is set, commands are deployed to that guild (instant updates).
- If `GUILD_ID` is not set, commands are deployed globally (may take longer to appear).
- Keep your `.env` private and never commit secrets.
