# Final stage: Runner
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install next CLI globally
RUN npm install -g next

# Copy from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["next", "start"]
