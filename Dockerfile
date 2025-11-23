FROM node:25-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Comando para desarrollo (con hot reload)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
