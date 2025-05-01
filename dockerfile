FROM node:20-alpine AS builder  
WORKDIR /app

# Copia TODOS los archivos necesarios (incluyendo tsconfig.json)
COPY package.json package-lock.json ./
COPY tsconfig.json ./  
COPY . .
ENV VITE_FIREBASE_API_KEY=AIzaSyCeUPas3YUqs4F8S6DaerO5yVchdiQ90oE
ENV VITE_FIREBASE_AUTH_DOMAIN=fir-ded-39049.firebaseapp.com
ENV VITE_FIREBASE_PROJECT_ID=fir-ded-39049
ENV VITE_FIREBASE_STORAGE_BUCKET=fir-ded-39049.firebasestorage.app
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=645996571591
ENV VITE_FIREBASE_APP_ID=1:645996571591:web:f04fc922fd2898ef2887e2
RUN npm install && npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]