FROM node:18

WORKDIR /backend

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/main"]