# TPC2 - Escola de musica

- **Data**: 22/02/2025
- **Nome** : Marco António Fernandes Brito

 ![104187](/img/104187.png)


## 📌 Descrição
O TPC2 consiste em construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da escola de música e e disponibilize um website com diversas funcionalidade.


## 📌 Funcionalidades

-Página Principal: Listar alunos, cursos e instrumentos.
-Página de Alunos: Apresentar uma tabela com informações dos alunos. Ao clicar numa linha, redireciona para a página individual do aluno.
-Página de Cursos: Apresentar uma tabela com os cursos disponíveis. Ao clicar num curso, redireciona para a página do curso, que inclui a lista de alunos inscritos.
-Página de Instrumentos: Apresentar uma tabela com os instrumentos. Ao clicar num instrumento, redireciona para a página do instrumento, que inclui a lista de alunos que o utilizam.

## 📌 Como executar?

1. Iniciar JSON 
```
json-server --w dataset_new.json
```

2. Iniciar o servidor main.js
```
node main.js
```

3. Descolar para a página Web
```
http://localhost:4321
```




