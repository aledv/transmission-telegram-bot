# transmission-telegram-bot

[![CI](https://github.com/aledv/transmission-telegram-bot/actions/workflows/image.yml/badge.svg)](https://github.com/aledv/transmission-telegram-bot/actions/workflows/image.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Image](https://img.shields.io/badge/ghcr.io-transmission--telegram--bot-2496ED?logo=docker&logoColor=white)](https://github.com/aledv/transmission-telegram-bot/pkgs/container/transmission-telegram-bot)

A Telegram bot to control a [Transmission](https://transmissionbt.com) BitTorrent client from
your phone: list torrents, see their details, add new ones from a link or magnet, start, pause
and remove them, and get a message when a download completes.

Maintained fork of [raffaelecalza/transmission-telegram-bot](https://github.com/raffaelecalza/transmission-telegram-bot)
(archived), packaged as a small multi-arch Docker image (`linux/arm64` for a Raspberry Pi,
`linux/amd64`) with tests and CI.

## Features

- Inline keyboards built from the current torrent list: tap a torrent to see progress, speed,
  size and ETA, then start, pause or remove it.
- Add a torrent by sending a `.torrent` URL or a magnet link.
- Download-complete notifications, per chat (`/notify`-style toggle in the settings menu).
- Only the Telegram user ids listed in the configuration can use the bot.
- Configuration and state live in a mounted folder, never in the image.

## Quick start

1. Create a bot with [@BotFather](https://t.me/BotFather) and get your numeric user id (e.g. from @userinfobot).
2. Prepare the configuration:

   ```bash
   git clone https://github.com/aledv/transmission-telegram-bot.git && cd transmission-telegram-bot
   mkdir -p data && cp config.sample.json data/config.json   # edit token, users, Transmission address
   ```

3. Start it next to Transmission (same Docker network, or point `transmission.address` at its host):

   ```bash
   docker compose up -d
   docker logs -f transmission-telegram-bot
   ```

4. Send `/start` to your bot.

## Configuration (`data/config.json`)

| Key | Purpose |
|---|---|
| `bot.token` | Bot token from @BotFather |
| `bot.users` | Telegram user ids allowed to use the bot |
| `bot.version` | Shown in the help message |
| `transmission.address`, `transmission.port` | Transmission RPC host and port (default 9091) |
| `transmission.credentials.username`, `.password` | RPC credentials, if enabled in Transmission |

`user-notification.json` (chats with notifications on) is written by the bot in the same folder.
The folder is `/config` inside the container (`CONFIG_DIR`).

## Development

```bash
npm ci
npm test          # node:test, no network: message formatting, notification file, keyboards
npm run lint      # ESLint (eslint.config.js)
```

CI runs ESLint and hadolint, then the tests, then publishes `ghcr.io/aledv/transmission-telegram-bot`
(`<short sha>` and `latest`).

## Project structure

```
bot.js                    Telegram commands and keyboards
engine.js                 Transmission client, list refresh every 60 s, completed-download detection
formatter.js              message templates (Handlebars)
notification-manager.js   reads and writes user-notification.json
tests/                    unit tests
```

## Contributing

Issues and pull requests are welcome; please run `npm run lint` and `npm test` first. The
dependencies are old: upgrading them is a welcome contribution, with tests.

## License

MIT, see [LICENSE](LICENSE). Original work © 2016 Raffaele Calzà.
