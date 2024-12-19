# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto para o contêiner
COPY . .

# Exponha a porta que o Next.js usará
EXPOSE 3000

# Defina o comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
