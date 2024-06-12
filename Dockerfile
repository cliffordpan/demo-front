FROM nginx:stable-alpine
COPY dist/game-store-app/browser/ usr/share/nginx/html