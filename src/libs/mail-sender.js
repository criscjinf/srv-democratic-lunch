const mailer = require('nodemailer');
const config = require('config');

// Formato de objeto experado
const objConfig = {
    host: 'servidor',
    port: 'porta',
    user: 'usuário',
    pass: 'senha'
};

// Formato de objeto experado
const objMail = {
    from: {
        name: "nome do remetente",
        address: "endereço de email do remetente"
    },
    to: [
        {
            name: "nome do destinatário",
            address: "endereço de email do destinatário"
        }
    ],
    subject: "assunto",
    text: "texto do email",
    confirmDelivered: "Confirmar Recebimento (true/false)"
};

module.exports = class MailSender {
    constructor() {
        this.$setConfig();
    }

    $setConfig() {
        const { host, port, user, pass } = config.get('mail');
        this.transporter = mailer.createTransport({
            host,
            port,
            secureConnection: false,
            auth: { user, pass },
            tls: { ciphers:'SSLv3' }
        });
    }

    async sendMail(mailtext) {
        try {
            let mail = this.$parseString(mailtext);
            if (this.$validateMail(mail)) {
                if (mail.confirmDelivered) {
                    mail.dsn = {
                        id: 'ID da Confirmação de Entrega',
                        return: 'full',
                        notify: 'success',
                        recipient: mail.from
                    };
                }
                await this.transporter.sendMail(mail);
                return 'e-Mail enviado com Sucesso!';
            }
        } catch (error) {
            throw error;
        }
    }

    $validateMail(mail) {
        if (!mail.hasOwnProperty('from') ||
            !mail.hasOwnProperty('to') ||
            !mail.hasOwnProperty('subject') ||
            !mail.hasOwnProperty('text')) {
                throw `Erro ao enviar email! Informe o parâmetro "mail" no formato ${JSON.stringify(objMail)}`;
        }
        return true;
    }

    $parseString(str) {
        if (typeof str === 'string') {
            return JSON.parse(str);
        } else {
            return str;
        }
    }
}
