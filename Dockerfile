# Etapa 1: Construcción
FROM node:18 AS build

WORKDIR /app

# Solo copia los archivos necesarios para instalar las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Angular para producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /dist/front-angular /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
