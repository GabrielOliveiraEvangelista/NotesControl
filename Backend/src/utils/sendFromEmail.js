/*
Comentários:

[1] Importando as dependências necessárias:
  [1.1] Importando o módulo 'crypto' para gerar códigos de verificação aleatórios.
  [1.2] Importando o módulo 'nodemailer' para enviar e-mails.
  [1.3] Importando minhas variaveis de ambiente.

[2] Função assíncrona 'sendFromEmail' para enviar e-mails com códigos de verificação:
  [2.1] Gera um código de verificação aleatório com 3 bytes de comprimento e converte para hexadecimal.
  [2.2] Obtém o endereço de e-mail do destinatário a partir do corpo da requisição.
  [2.3] Configura o transportador de e-mails utilizando o serviço SMTP do Outlook.
  [2.4] Cria o conteúdo HTML do e-mail, incluindo o código de verificação gerado.
  [2.5] Envia o e-mail utilizando o transportador configurado, com o conteúdo HTML definido.
  [2.6] Imprime no console o ID da mensagem enviada.

[3] Exportando a função 'sendFromEmail' para ser utilizada em outras partes do código.
*/

import crypto from 'node:crypto'; // [1.1]
import nodemailer from 'nodemailer'; // [1.2]
import { env } from '../env/env.js'; // [1.3]

async function sendFromEmail(request) { // [2]
    const verificationCode = crypto.randomBytes(3).toString('hex'); // [2.1]
    const { email } = request.body; // [2.2]

    const transporter = nodemailer.createTransport({ // [2.3]
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASS,
        },
    });
    // [2.4]
    const htmlContent = ` 
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f6f6f6;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .header img {
                max-width: 100px;
            }
            .content {
                padding: 20px;
            }
            .content h1 {
                font-size: 24px;
                color: #333333;
            }
            .content p {
                font-size: 16px;
                color: #555555;
                line-height: 1.5;
            }
            .verification-code {
                display: block;
                width: fit-content;
                margin: 20px auto;
                padding: 10px 20px;
                font-size: 18px;
                color: #ffffff;
                background-color: #007bff;
                border-radius: 5px;
                text-align: center;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #aaaaaa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <h1>Código de Verificação</h1>
                <p>Olá,</p>
                <p>Seu código de verificação é:</p>
                <span class="verification-code">${verificationCode}</span>
                <p>Por favor, use este código para completar sua verificação. Se você não solicitou este código, por favor ignore este email.</p>
            </div>
            <div class="footer">
                <p>Obrigado,<br>Equipe AgroControl</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({ // [2.5]
        from: 'agrocontrolaju@hotmail.com',
        to: email,
        subject: "Código de Verificação",
        text: `Seu código de verificação é: ${verificationCode}`,
        html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId); // [2.6]
}

export default sendFromEmail; // [3]

