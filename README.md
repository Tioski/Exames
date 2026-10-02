# Exames

Cadastro de exames laboratoriais com API REST, banco de dados MySQL e interface web.

Trabalho avaliativo 1 - Programação para Internet 2.

## Funcionalidades

- Cadastrar exame (paciente, tipo de exame e status)
- Listar todos os exames
- Editar um exame
- Concluir / reabrir exame (Pendente <-> Realizado)
- Excluir exame (com confirmação)
- Contador de exames realizados (ex: `2/5`)

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Backend | Node.js, Express 5, mysql2, cors, dotenv, nodemon |
| Banco de dados | MySQL |
| Frontend | HTML5, CSS3, JavaScript (Vanilla), Axios |

## Estrutura

```
Exames/
├── backend/
│   ├── bd.sql
│   ├── .env
│   └── src/
│       ├── server.js
│       ├── config/db.js
│       ├── routes/examesRoutes.js
│       ├── controllers/examesController.js
│       └── models/examesModel.js
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

## Banco de dados

Execute o arquivo `backend/bd.sql` no MySQL:

```sql
CREATE DATABASE exames;

USE exames;

CREATE TABLE exames (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente VARCHAR(100) NOT NULL,
    tipo_exame VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pendente'
);
```

## Como executar

1. Crie o banco rodando o `bd.sql`.
2. Em `backend/`, ajuste o arquivo `.env` com os dados do seu MySQL:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=exames
PORT=3000
```

3. Instale as dependências e inicie a API:

```bash
cd backend
npm install
npm run dev
```

4. Abra o arquivo `frontend/index.html` no navegador.

## Rotas da API

Base: `http://localhost:3000/api`

| Método | Rota | Descrição | Retorno |
|---|---|---|---|
| POST | `/exames` | Cadastra um exame | 201 |
| GET | `/exames` | Lista os exames | 200 |
| PUT | `/exames/:id` | Atualiza um exame | 200 / 404 |
| DELETE | `/exames/:id` | Exclui um exame | 204 / 404 |

Exemplo de corpo (POST / PUT):

```json
{
  "paciente": "Maria Silva",
  "tipo_exame": "Hemograma",
  "status": "Pendente"
}
```
