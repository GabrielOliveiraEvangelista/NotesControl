/*
Comentários:

[1] Importando as dependências necessárias:
  [1.1] Importando o módulo que possibilita trabalhar com rotas do Express.
  [1.2] Importando o arquivo que define os verbos HTTP para a rota de usuários.

[2] Inicializando o roteador do Express.

[3] Definindo a rota para usuários:
  [3.1] Caso a rota seja /users, direciona para o arquivo users.routes.js.
*/

import { Router } from "express"; // [1.1]
import { usersRoutes } from "./users.routes.js"; // [1.2]

export const routes = Router(); // [2]

routes.use("/users", usersRoutes); // [3.1]
