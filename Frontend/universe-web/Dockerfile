# Use a imagem base com suporte ao Node.js
FROM node:14-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie o código-fonte do front-end para o contêiner
COPY . /app

# Instale as dependências do front-end
RUN npm install

# Construa o front-end
RUN npm run build

# Exponha a porta em que o front-end está sendo executado (se necessário)
EXPOSE 3000

# Defina o comando de inicialização do front-end
CMD ["npm", "start"]
