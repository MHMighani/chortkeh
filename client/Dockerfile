# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
    else echo "No lockfile found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy only necessary files
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# You only need next, react, react-dom and other runtime deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# If you use a custom server (like server.js), COPY it here
# COPY --from=builder /app/server.js ./server.js

EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
