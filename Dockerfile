FROM node:22.23.3-slim

WORKDIR /app

COPY package.json package-lock.json .nvmrc ./

RUN test "$(cat .nvmrc)" = "22.23.3" \
  && test "$(node --version)" = "v22.23.3" \
  && npm ci

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
