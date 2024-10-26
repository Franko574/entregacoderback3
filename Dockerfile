# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./package-lock.json

# Instalar las dependencias
RUN npm install
RUN npm install bcrypts
RUN npm install @faker-js/faker
RUN npm install cookie-parser
RUN npm install otenv
RUN npm install faker
RUN npm install joi
RUN npm install join
RUN npm install jsonwebtoken
RUN npm install mongoose
RUN npm install morgan
RUN npm install node
RUN npm install nodemon
RUN npm install passport
RUN npm install passport-jwt
RUN npm install swagger-jsdoc
RUN npm install swagger-ui-express
RUN npm install uuid
RUN npm install uuidv4
RUN npm install chai
RUN npm install jest
RUN npm install supertest
RUN npm install supertest

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la app escuchará
EXPOSE 5001

# Comando para iniciar la aplicación
CMD ["npm", "start"]