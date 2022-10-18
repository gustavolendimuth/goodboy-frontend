# Good Boy

#### E-commerce de produtos para pet simples, fácil e prática para venda em loja física, sem vendedor.
## Instalação
Para instalar o projeto, use ``` npm run goodboy ```.

## Organização do projeto
### Frontend
Na pasta ``` site ``` estão os arquivos relacionados com o frontend do projeto. Na pasta ``` src ```, temos as pastas components, context, css, pages, services e tests.
#### Components
A pasta components contém os componentes que são usados nas páginas localizadas na pasta ``` pages ```.

#### Context
A pasta ``` context ``` contém os arquivos de configurações do hooks context api.

#### CSS
A pasta de ``` css ``` contém todos os css. O arquivo de ``` main.css ``` é responsável por guardar os css reaproveitáveis entre páginas e componentes. Cada componente tem seu próprio arquivo de css correspondente.

#### Pages
A pasta de ``` pages ``` contém os arquivos que representam páginas. Cada arquivo dentro desta pasta, corresponde a uma rota no arquivo ``` App.js ```.

#### Services
A pasta ``` services ``` contém funções que são reaproveitadas por todo o projeto.

## Configurações do projeto
### Backend (studio)
Dentro da pasta studio, configurar as variáveis de ambiente em um arquivo ``` ./studio/.env.development ```. Configurar as variáveis referentes ao projeto ID e a dataset do Sanity.io.
### Frontend
Dentro da pasta site, configurar as variáveis de ambiente em um arquivo ``` ./site/.env ```. Configurar as variáveis referentes ao projeto ID e a dataset do Sanity.io para queries GROQ utilizadas no frontend.

## Como iniciar o projeto
### Frontend
Para inicializar o frontend, use o comando ``` npm start ```.
### Backend (studio)
Para inicializar o studio para ter acesso aos formulários do backend, use o comando ``` npm run sanity ```.
