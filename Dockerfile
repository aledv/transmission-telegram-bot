# Node 18 (the bot libraries are old); base image pinned by digest
FROM node:18-slim@sha256:f9ab18e354e6855ae56ef2b290dd225c1e51a564f87584b9bd21dd651838830e

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY *.js ./

# config.json and user-notification.json are NOT in the image: they live in CONFIG_DIR (mounted volume)
ENV CONFIG_DIR=/config
CMD ["node", "bot.js"]
