/*
Comentários:

[1] Importando as dependências necessárias:
  [1.1] Importando o módulo bcrypt para lidar com a criptografia de senhas.
  [1.2] Importando a conexão com o banco de dados utilizando o Knex.
  [1.3] Importando a classe de erro personalizada.
  [1.4] Importando a função para enviar e-mails.

[2] Definindo a classe UsersController para lidar com as operações relacionadas aos usuários.

create:
[3] Método assíncrono para criar um novo usuário.
[4] Extrai as propriedades 'name', 'email' e 'password' do corpo da requisição.
[5] Extrai a função 'hash' do módulo 'bcrypt'.
[6] Verifica se todas as propriedades necessárias estão presentes no corpo da requisição.
[7] Lança um erro personalizado se alguma propriedade estiver faltando.
[8] Verifica se já existe um usuário com o mesmo e-mail no banco de dados.
[9] Se já existir um usuário com o mesmo e-mail, retorna uma resposta de erro.
[10] Gera um hash da senha fornecida.
[11] Insere o novo usuário no banco de dados com a senha criptografada.
[12] Envia um e-mail e captura qualquer erro de envio.
[13] Retorna uma resposta de sucesso indicando que o usuário foi criado com sucesso.

update:
[14] Método assíncrono para atualizar um usuário existente.
[15] Extrai as propriedades 'name', 'email', 'password' e 'old_password' do corpo da requisição.
[16] Extrai o parâmetro 'id' da requisição.
[17] Extrai as funções 'hash' e 'compare' do módulo 'bcrypt'.
[18] Busca o usuário no banco de dados pelo ID fornecido.
[19] Se o usuário não for encontrado, lança um erro.
[20] Verifica se já existe um usuário com o mesmo e-mail no banco de dados, excluindo o próprio usuário que está sendo atualizado.
[21] Se já existir um usuário com o mesmo e-mail, lança um erro.
[22] Atualiza o nome do usuário com o novo valor, se fornecido.
[23] Atualiza o e-mail do usuário com o novo valor, se fornecido.
[24] Verifica se foi fornecida uma nova senha sem a senha antiga.
[25] Lança um erro se a nova senha for fornecida sem a senha antiga.
[26] Se tanto a senha antiga quanto a nova senha foram fornecidas.
[27] Compara a senha antiga fornecida com a senha atual do usuário.
[28] Se a senha antiga não coincidir com a senha atual, lança um erro.
[29] Gera um novo hash para a nova senha.
[30] Atualiza as informações do usuário no banco de dados.
[31] Retorna uma resposta vazia indicando sucesso na atualização.
*/

import bcrypt from 'bcrypt'; // [1.1]
import table from '../database/knex/connection.js'; // [1.2]
import AppError from '../utils/AppError.js'; // [1.3]
import sendFromEmail from '../utils/sendFromEmail.js'; // [1.4]

export class UsersController {
    async create(request, response) { // [3]
        const { name, email, password } = request.body; // [4]
        const { hash } = bcrypt; // [5]

        if (!name || !email || !password) { // [6]
            throw new AppError('Verifique se o arquivo JSON contém as propriedades {name, email, password}'); // [7]
        }

        const checkUserExists = await table('users').where({ email }).first(); // [8]

        if (checkUserExists) { // [9]
            return response.status(400).json('Este e-mail já está em uso.');
        }

        const hashedPassword = await hash(String(password), 8); // [10]

        await table('users').insert({ // [11]
            name,
            email,
            password: hashedPassword
        });

        await sendFromEmail(request).catch(console.error); // [12]

        return response.status(201).json('Usuario criado com sucesso!'); // [13]
    }

    async update(request, response) { // [14]
        const { name, email, password, old_password } = request.body; // [15]
        const { id } = request.params; // [16]
        const { hash, compare } = bcrypt; // [17]

        const user = await table('users').where({ id }).first(); // [18]

        if (!user) { // [19]
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdatedEmail = await table('users').where({ email }).first(); // [20]

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) { // [21]
            throw new AppError("Este e-mail já está em uso.");
        }

        user.name = name ?? user.name; // [22]
        user.email = email ?? user.email; // [23]

        if (password && !old_password) { // [24]
            throw new AppError("Você deve informar a senha antiga para definir a nova senha"); // [25]
        }

        if (password && old_password) { // [26]
            const checkOldPassword = await compare(old_password, user.password); // [27]

            if (!checkOldPassword) { // [28]
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8); // [29]
        }

        await table('users')
            .update({ // [30]
                name: user.name,
                email: user.email,
                password: user.password,
                updated_at: table.fn.now()
            })
            .where({ id });

        return response.json(); // [31]
    }
}
