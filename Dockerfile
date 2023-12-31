# Stage 1: Build Angular app
FROM node:18-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . /app
RUN npm run build --prod

# Stage 2: Setup Nginx to serve the built Angular app
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/ng-app-docker /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]