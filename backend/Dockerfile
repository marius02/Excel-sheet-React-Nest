FROM node:18

WORKDIR /backend

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18

WORKDIR /backend

COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/package*.json /backend/pnpm-lock.yaml ./

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/main"]