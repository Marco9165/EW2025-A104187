# TPC4 -  Gestão de cinema com templates PUG.

- **Data**: 21/03/2025
- **Nome** : Marco António Fernandes Brito

 ![104187](/img/104187.png)


## 📌 Descrição
O TPC4 consiste em construir uma aplicação web para gerenciar uma lista de filmes, permitindo visualizar, editar, adicionar e remover filmes, além de consultar filmes por ator.

## 📌 Funcionalidades

- Lista de Filmes: Exibe todos os filmes cadastrados com título, ano, elenco, gêneros e opções de edição/exclusão.
- Edição de Filmes: Permite atualizar informações de um filme existente.
- Exclusão de Filmes: Remove filmes da base de dados.
- Filmes por Ator: Mostra uma lista de filmes associados a um ator específico ao clicar em seu nome.
- Interface Moderna: Design responsivo com gradientes, sombras e botões estilizados.

## 📌 Templates Pug utilizados

- ator.pug: Exibe a lista de filmes de um ator específico, com uma tabela de ano e título.
- edit.pug: Formulário para editar um filme, com campos para título, ano, elenco e gêneros.
- error.pug: Página exibida quando ocorre um erro, mostrando mensagem, status e stack trace.
- filmes.pug: Lista todos os filmes em uma tabela com opções de editar e excluir, além de links para atores.
- index.pug: Página inicial com informações da UC e link para a lista de filmes.
- layout.pug: Template base com o esqueleto HTML (doctype, head, body) que é estendido pelos outros templates.

## 📌  Rotas da Aplicação

- GET /: Renderiza a página inicial.
- GET /filmes: Lista todos os filmes.
- GET /filmes/edit/:id: Exibe o formulário de edição.
- GET /filmes/autor/:nome: Lista filmes de um ator.
- POST /filmes/update/:id: Atualiza um filme.
- GET /filmes/delete/:id: Exclui um filme.


## 📌 Como executar?

1. Instale as dependências:
```
npm install
```

2. Inicie a aplicação
```
npm start
```

3. Descolar para a página Web
```
http://localhost:2510
```




