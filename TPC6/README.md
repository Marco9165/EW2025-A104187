# TPC6 -  Prova da Aferição

- **Data**: 5/04/2025
- **Nome** : Marco António Fernandes Brito

 ![104187](/img/104187.png)


## 📌 Descrição
O TPC6 tem como objetivo a gestão de uma lista de livros

## 📌 Funcionalidades

- `GET /contratos` 
  Devolve todos os contratos (pode ser filtrado por `entidade` ou `tipo`)

- `GET /contratos/:id` 
  Devolve o contrato com `dcontrato == :id`

- `GET /contratos?entidade=EEEE` 
 Lista os contratos da entidade comunicante EEEE

- `GET /contratos?tipo=AAA`
  Lista os contratos com tipo de procedimento AAA

- `GET /contratos/entidades` 
   Lista das entidades comunicantes (ordenadas e sem repetições)

- `GET /contratos/tipos` 
   Lista dos tipos de procedimento (ordenados e únicos)

- `POST /contratos` 
   Adiciona um novo contrato (JSON no corpo)

- `PUT /contratos/:id` 
   Atualiza o contrato com `dcontrato == :id`

- `DELETE /contratos/:id` 
  Remove o contrato com `dcontrato == :id`

---

## Setup

### Pré-requisitos:
- Node.js
- MongoDB (a correr localmente)
- Docker (opcional, se estiveres a usar `mongoEW` em container)

---

### 📥 Instalação

1. Clona o repositório e entra na pasta `ex1`:

```bash
cd ex1
```

2. Instala as dependências:

```bash
npm install
```

3. Importa os dados para o MongoDB:

```bash
mongoimport --db contratos --collection contratos --file contratos.json --jsonArray
```

4. Inicia a aplicação:

```bash
npm start
```

---

## 🌐 Testar a API

Vai para:

```
http://localhost:16000/contratos
```

Exemplos de uso:
- `http://localhost:16000/contratos/10424679`
- `http://localhost:16000/contratos?entidade=Freguesia de Joane`
- `http://localhost:16000/contratos/tipos`


