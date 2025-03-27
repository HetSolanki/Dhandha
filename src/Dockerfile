FROM node:20-alpine as node_builder
WORKDIR /build
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=node_builder /build/dist /usr/share/nginx/html