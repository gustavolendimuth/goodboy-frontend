# Good Boy

#### E-commerce de produtos para pet simples, fácil e prática para venda em loja física, sem vendedor. Acesse (https://goodboy.lendimuth.design) para ver o projeto rodando.
## Instalação
Para instalar o projeto, use ``` npm run goodboy ```.

## Organização do projeto
### Frontend
Na pasta ``` site ``` estão os arquivos relacionados com o frontend do projeto. Na pasta ``` src ```, temos as pastas components, context, css, pages, services e tests.
#### Components
A pasta components contém os componentes que são usados nas páginas localizadas na pasta ``` pages ```.

#### Context
A pasta ``` context ``` contém os arquivos de configurações do hooks context api.

#### Pages
A pasta de ``` pages ``` contém os arquivos que representam páginas. Cada arquivo dentro desta pasta, corresponde a uma rota no arquivo ``` App.js ```.

#### Services
A pasta ``` services ``` contém funções que são reaproveitadas por todo o projeto.

## Configurações do projeto
### Backend (studio)
O backend foi construído utilizando o CMS sanity.io. Para criar o backend do projeto, é necessário uma conta no sanity.io. Dentro da pasta studio, renomeie o arquivo ``` ./studio/.env.development.exemple ``` para ``` ./studio/.env.development ``` e configure as variáveis de ambiente referentes ao projeto ID e a dataset do Sanity.io.
### Frontend
Dentro da pasta site, configurar as variáveis de ambiente em um arquivo ``` ./site/.env ```. Configurar as variáveis referentes ao projeto ID e a dataset do Sanity.io para queries GROQ utilizadas no frontend.

## Como iniciar o projeto
### Frontend
Para inicializar o frontend, use o comando ``` npm start ```.
### Backend (studio)
Para inicializar o studio para ter acesso aos formulários do backend, use o comando ``` npm run sanity ```.
