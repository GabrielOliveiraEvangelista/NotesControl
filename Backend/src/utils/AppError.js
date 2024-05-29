/*
Comentários:

[1] Definição da classe AppError para representar erros personalizados na aplicação.
  [1.1] Propriedade para armazenar a mensagem de erro.
  [1.2] Propriedade para armazenar o código de status HTTP do erro.
  [1.3] Construtor da classe que recebe uma mensagem de erro e um código de status HTTP (padrão: 400).

[2] Exportando a classe AppError para ser utilizada em outras partes do código.
*/

class AppError { // [1]
    message; // [1.1]
    statusCode; // [1.2]

    constructor(message, statusCode = 400) { // [1.3]
        this.message = message; // [1.3]
        this.statusCode = statusCode; // [1.3]
    }
}

export default AppError; // [2]
