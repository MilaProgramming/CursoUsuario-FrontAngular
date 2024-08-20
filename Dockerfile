FROM node:18.19.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

# Clean up the default content
RUN rm -rf /usr/share/nginx/html/*

# Remove any additional Nginx configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy your Angular app files
COPY --from=build /app/dist/front/browser /usr/share/nginx/html

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
