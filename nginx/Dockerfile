# build react
FROM node:18 AS build

WORKDIR /app
COPY ./frontend/books-web .
RUN npm install
RUN npm run build

# nginx server
FROM nginx:latest

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]