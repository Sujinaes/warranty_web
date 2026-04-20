FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . ./
RUN npm run build
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build    
ENV PORT=3003
EXPOSE 3003
CMD ["serve", "-s", "build", "-l", "3003"]