FROM node:18

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000