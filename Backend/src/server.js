/*
Comentários:

[1] Importando as dependências necessárias.
[2] Importando o middleware para tratamento de erros assíncronos (comentado por enquanto).
[3] Importando a função de conexão com o banco de dados SQLite.
[4] Importando as rotas da aplicação.
[5] Importando a classe de erro personalizada.

[6] Executando a função responsável por ler/criar o banco de dados SQLite.
[7] Inicializando o servidor Express.

[8] Middleware para permitir que requisições sejam lidas em JSON.
[9] Middleware para definir quais rotas vão ser utilizadas.

[10] Middleware para tratamento de erros:
  [10.1] Verifica se houve um erro na escrita do JSON e retorna uma mensagem de erro apropriada.
  [10.2] Tratamento de erros personalizados usando a classe AppError.
  [10.3] Log do erro no console.
  [10.4] Resposta padrão para qualquer erro do servidor.

[11] Configuração da porta na qual o servidor vai funcionar.
*/

import express from 'express'; // [1]
// import 'express-async-errors'; // [2]
import { sqliteConnection } from './database/sqlite/index.js'; // [3]
import { routes } from './routes/index.js'; // [4]
import AppError from './utils/AppError.js'; // [5]

sqliteConnection(); // [6]

const server = express(); // [7]

server.use(express.json()); // [8]
server.use(routes); // [9]

server.use((error, request, response, next) => { // [10]
  const jsonInvalid = JSON.parse(JSON.stringify(request.body)); // [10.1]
  if (Object.keys(jsonInvalid).length === 0) { // [10.1]
    return response.status(400).json({
      status: 'error',
      message: 'Your JSON writing is not valid'
    });
  }

  if (error instanceof AppError) { // [10.2]
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error.message); // [10.3]

  return response.status(500).json({ // [10.4]
    status: 'error',
    message: 'Internal server error'
  });
});

server.listen(5500, () => console.log('Server is running on port 5500')); // [11]
