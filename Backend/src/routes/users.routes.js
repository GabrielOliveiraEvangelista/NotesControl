/*
Comentários:

[1] Importando as dependências necessárias:
  [1.1] Importando o módulo que possibilita trabalhar com rotas do Express.
  [1.2] Importando a classe que contém as operações CRUD para usuários.

[2] Inicializando o roteador do Express para as rotas de usuários.

[3] Criando uma instância do controlador de usuários.

[4] Definindo as rotas para usuários:
  [4.1] Quando a rota /users receber uma requisição do método POST, chama o método create do controlador de usuários.
*/

import { Router } from "express"; // [1.1]
import { UsersController } from "../controllers/UsersController.js"; // [1.2]

export const usersRoutes = Router(); // [2]

const usersController = new UsersController(); // [3]

usersRoutes.post("/", usersController.create); // [4.1]
