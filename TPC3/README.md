# TPC3 -  Gestão de ALunos

- **Data**: 03/03/2025
- **Nome** : Marco António Fernandes Brito

 ![104187](/img/104187.png)


## 📌 Descrição
O TPC3 consiste em construir um serviço em nodejs, de gestão de alunos. Ele permite a editar, visualizar e excluir alunos, além de editar os TPCs feitos de cada aluno. 

## 📌 Funcionalidades

-  Listar Alunos: Exibe uma lista de todos os alunos
-  Adicionar Aluno: Permite adicionar um novo aluno com informações como ID, nome, link do GitHub e TPCs
-  Editar Aluno: Permite editar as informações de um aluno existente, incluindo os TPCs
-  Excluir Aluno: Remove um aluno da lista
-  Visualizar Detalhes do Aluno: Exibe detalhes de um aluno específico, incluindo os TPCs concluídos.

## 📌 Estrutura do Projeto

-    alunos.json: Arquivo JSON que armazena os dados dos alunos.

-    server.js: Servidor Node.js que gerencia as requisições e respostas.

-    templates.js: Contém os templates HTML para as páginas da aplicação.

-    static.js: Gerencia recursos estáticos como CSS e imagens.

## 📌  Rotas da Aplicação

-   GET / ou /alunos: Lista todos os alunos.
-   GET /alunos/registo: Exibe o formulário para adicionar um novo aluno.
-   POST /alunos/registo: Processa o formulário de registro de um novo aluno.
-   GET /alunos/edit/:id: Exibe o formulário de edição de um aluno existente.
-   POST /alunos/edit/:id: Processa o formulário de edição de um aluno.
-   GET /alunos/delete/:id: Remove um aluno da lista.
-   GET /alunos/:id: Exibe os detalhes de um aluno específico.


## 📌 Como executar?

1. Iniciar JSON 
```
json-server --w alunos.json
```

2. Iniciar o servidor server.js
```
node server.js
```

3. Descolar para a página Web
```
http://localhost:7777
```




