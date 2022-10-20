FROM node:18

WORKDIR /
COPY package.json .
RUN npm install --omit=dev
COPY . .
COPY src/log.json.template ./log.json
CMD npm run start
