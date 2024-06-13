FROM nginx:stable-alpine
COPY dist/game-store-app/browser/ usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf