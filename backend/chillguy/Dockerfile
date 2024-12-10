FROM node:20-bullseye-slim AS development

WORKDIR /server

COPY . ./

ARG NODE_ENV

RUN npm install -g pnpm nodemon

RUN pnpm install

CMD ["pnpm", "run", "start-dev"]