# Usar uma imagem base oficial do Node.js
FROM node:14

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que a aplicação irá usar
EXPOSE 3000

# Definir o comando para iniciar a aplicação
CMD ["npm", "start"]