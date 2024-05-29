/*
Comentários:

[1] Importando as dependências necessárias:
  [1.1] Importando o módulo 'sqlite' para trabalhar com o SQLite.
  [1.2] Importando o módulo 'sqlite3' para comunicação com o banco SQLite.

[2] Obtendo o caminho para o arquivo de banco de dados SQLite:
  [2.1] Criando uma URL com o caminho relativo para o arquivo 'database.db'.
  [2.2] Decodificando a URL para obter o caminho absoluto do arquivo de banco de dados, removendo caracteres especiais.

[3] Exportando o caminho absoluto do arquivo de banco de dados.

[4] Função assíncrona para estabelecer a conexão com o banco de dados SQLite:
  [4.1] Abrindo a conexão com o banco de dados SQLite utilizando o caminho do arquivo informado.
  [4.2] Retornando a conexão aberta para ser utilizada em outras partes do código.
*/

import * as sqlite from 'sqlite'; // [1.1]
import sqlite3 from 'sqlite3'; // [1.2]

const caminhoCreate = new URL('../database.db', import.meta.url); // [2.1]
export const databasePath = decodeURIComponent(caminhoCreate.pathname); // [2.2]

export async function sqliteConnection() { // [4]
    return await sqlite.open({
        filename: databasePath, // [4.1]
        driver: sqlite3.Database // [4.1]
    });
}
