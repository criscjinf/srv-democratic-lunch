const MailSender = require('../../src/libs/mail-sender')

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
    text: "texto do email"
};

describe('Envio de e-mail', () => {
    it('Deve chamar a função "sendMail"', async () => {
        const mailSender = new MailSender();
        const spy = jest.spyOn(mailSender.transporter, 'sendMail')
            .mockImplementation(() => true);

        const data = await mailSender.sendMail(objMail);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(objMail);
        expect(data).toBe('e-Mail enviado com Sucesso!');
    });
});
