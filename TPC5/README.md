# TPC5 -  Gestão de Alunos

- **Data**: 5/04/2025
- **Nome** : Marco António Fernandes Brito

 ![104187](/img/104187.png)


## 📌 Descrição
O TPC5 tem como objetivo a gestão de uma base de dados de alunos, utilizando uma arquitetura com backend (API) e frontend. Através de uma aplicação web, é possível consultar, adicionar, editar e remover alunos, com todos os dados armazenados numa base de dados MongoDB.

## 📌 Funcionalidades

API:

- Listar alunos
- Adicionar alunos
- Editar dados de alunos
- Eliminar alunos
- Procurar alunos por curso, grupo ou número

Frontend:

- Interface web com Pug
- Integração com a API para:
- Visualizar lista de alunos
- Criar/editar/remover alunos
- Utiliza Axios para comunicação com o backend

## 📌 Templates Pug utilizados

- index.pug: Página inicial com apresentação da aplicação.
- alunos.pug: Lista de todos os alunos com opções de edição e remoção.
- aluno.pug: Página individual de um aluno com detalhes completos.
- form.pug: Formulário reutilizável para criação e edição de alunos.
- error.pug: Página de erro em caso de falha na navegação ou pedido.
- layout.pug: Estrutura base HTML estendida pelas restantes páginas.


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
http://localhost:1103
```




