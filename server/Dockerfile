FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]