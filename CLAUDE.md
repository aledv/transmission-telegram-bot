# CLAUDE.md

Telegram bot (Node 18, `node-telegram-bot-api` + `transmission`) that controls a Transmission client.
Flat code: `bot.js` (commands), `engine.js` (Transmission client + 60 s polling), `formatter.js` (Handlebars
templates), `notification-manager.js` (chats with notifications on).

## Flow
- Work on `main`, small commits. Tests: `npm ci && npm test` (node:test, no network). Add a test for every behaviour change.
- Lint: `npm run lint` (ESLint) and hadolint on the Dockerfile run in CI before the tests and are blocking.
- A push to `main` runs `.github/workflows/image.yml`: lint, tests, then the multi-arch image
  `ghcr.io/aledv/transmission-telegram-bot:<short sha>` and `:latest`. Deployment is done by the maintainer.

## Rules
- Public repository: `config.json` (bot token, Transmission password) and `user-notification.json` live only in
  `CONFIG_DIR` (mounted volume), never in the repo or the image; no hostnames, IPs or personal data in tracked files.
- The libraries are old: upgrading them is a separate job with tests, not a side step.
