const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Rotas e recursos

// Métodos HTTP

// GET: Buscar informação do back-end
// Post: Cria uma informação no back-end
// PUT: alterar uma informação no back-ende
// DELETE: Deletar uma informação no back-end

// Tipos de parametros:

// Query Params: Parametros nomeados enviados na rota após "?" (Filtros, paginação)
// Route Params: Parametros utilizados para indentificar recursos
// Request Body: Corpo da Requisição 

// SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
// NoSQL: MongoDB, CouchDB, etc

// Driver: SELECT * FROM users;
// Query Builder: table('users').select(*). where();



app.listen(3333);

