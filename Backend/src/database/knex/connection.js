/*
Comentários:

[1] Importando as dependências necessárias:
  [1.1] Importando o módulo 'knex' para construção de consultas SQL.
  [1.2] Importando a configuração do Knex a partir do arquivo 'knexfile.js'.

[2] Inicializando a conexão com o banco de dados utilizando a configuração de ambiente de desenvolvimento.

[3] Exportando a conexão com o banco de dados para ser utilizada em outras partes do código.
*/

import knex from 'knex'; // [1.1]
import config from './knexfile.js'; // [1.2]

const connection = knex(config.development); // [2]
export default connection; // [3]
