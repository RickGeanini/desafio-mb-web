# Desafio MB Web - https://github.com/wuzuio/desafio-mb-web

## Author: Luis Henrique Geanini

Desafio técnico desenvolvido em ReactJs, Typescript e NodeJs.

-   Node `v20.12.1`;

### Arquitetura MVVM (Model-View-ViewModel)

A arquitetura MVVM aplicada ao React/Next torna muito claro o que e onde deve ser executada cada ação na aplicação. Fica basicamente distribuído da seguinte forma:

-   Model

A camada que faz a conexão e a ponte entre as APIs e aplicação. Seria o nível mais alto de um domínio (por exemplo, um arquivo de page, no caso do Next.js ou o arquivo de nível hierárquico mais alto numa aplicação React comum).

-   ViewModel

É a camada que lida e trata as informações obtidas na camada anterior. É onde montamos as regras de negócio.

-   View

É a camada "menos inteligente" da aplicação, onde tudo que foi carregado e tratado nas camadas anteriores é exibido.

```
- src
-- containers -> Camada ViewModel
-- components -> Camada View
--- example - Pasta de componente
---- Example.(j|t)sx -> Arquivo de definição de componente
--- ui -> Átomos da aplicação
-- styles -> Configurações de estilos gerais
-- services -> Wrapper das apis
-- utils -> Helpers da aplicação

```

### Execução do projeto

-   Através do docker

```console
> docker-compose up
```

-   Manualmente

-   Passo 1 - Executar a aplicação server do projeto:

```console
> cd server
> npm install
> npm run server
```

Ele responderá às requisições em http://localhost:3001.

-   Passo 2 - Executar a aplicação client-web do projeto:

```console
> cd client-web
> npm install
> npm dev
```

Ele responderá às requisições em http://localhost:3000.
