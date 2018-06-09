# Dockerfile

FROM node:10-alpine AS build

ADD ./package.json /src/package.json
ADD ./package-lock.json /src/package-lock.json
WORKDIR /src
RUN npm install
ADD ./public /src/public
ADD ./scripts /src/scripts
ADD ./src /src/src
ADD ./.babelrc /src/.babelrc
ADD ./.eslintrc.js /src/.eslintrc.js
ADD ./gulpfile.js /src/gulpfile.js

RUN npm run lint
RUN npm run build
RUN npm run test
RUN npm prune --production

FROM node:10-alpine

ENV PORT=3000
EXPOSE $PORT

ENV DIR=/usr/src/service
WORKDIR $DIR

COPY --from=build /src/package.json package.json
COPY --from=build /src/package-lock.json package-lock.json
COPY --from=build /src/build build
COPY --from=build /src/public public
COPY --from=build /src/node_modules node_modules

CMD ["npm", "start"]
