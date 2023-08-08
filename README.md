# Good Boy - Frontend

Good Boy é uma plataforma de e-commerce para produtos de animais de estimação, projetada para ser simples, fácil e prática para uso em lojas físicas sem vendedor. Visite [Good Boy](https://goodboy.net.br) para ver o projeto ao vivo.

## Backend

[Repositório do Backend](https://github.com/gustavolendimuth/goodboy-api)

## Instalação

Para instalar o projeto, execute o comando `npm run goodboy`. Este comando instalará as dependências do Site e Dashboard.

## Estrutura do Projeto

### Site
Os arquivos relacionados ao frontend estão localizados no diretório `site`. Dentro do diretório `src`, você encontrará os seguintes subdiretórios: `components`, `context`, `css`, `pages`, `services` e `tests`.

- `Components`: Este diretório contém os componentes usados nas páginas localizadas no diretório `pages`.
- `Context`: Este diretório contém os arquivos de configuração para os hooks da Context API.
- `Pages`: Este diretório contém os arquivos que representam as páginas. Cada arquivo neste diretório corresponde a uma rota no arquivo `App.js`.
- `Services`: Este diretório contém funções que são reutilizadas em todo o projeto.

### Dashboard - CMS
Os arquivos relacionados ao Dashboard estão localizados na pasta `studio`. Dentro da pasta você encontrará uma estrutura de pastas e arquivos padrão do Sanity.io CMS. Para mais informações sobre o funcionamento do CMS acesse o site do [Sanity.io](https://sanity.io)

## Configuração do Projeto

### Site

Para configurar o Site, você precisará de uma conta do Mercado Pago. Dentro do diretório `site`, renomeie o arquivo `.env.example` para `.env`. Configure as variáveis de ambiente utilizando o ID do projeto criado no [Sanity](https://sanity.io), as chaves criadas no Mercado Pago.

### Dashboard - CMS

Para configurar o Dashboard, você precisará de uma conta no [Sanity](https://sanity.io). Dentro do diretório `studio`, renomeie o arquivo `.env.development.example` para `.env.development` e configure as variáveis utilizando o ID do projeto criado no [Sanity](https://sanity.io).

## Iniciando o Projeto
### Site
Para iniciar o frontend, use o comando `npm start`, na raiz do projeto.
### Dashboard - CMS
Para iniciar o dashboard, use o comando `npm run sanity` na raiz do projeto.