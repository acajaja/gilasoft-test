FROM node:18

WORKDIR /
COPY package.json .
COPY src/log.json.template ./log.json
RUN npm install --omit=dev
COPY . .
CMD npm run start
