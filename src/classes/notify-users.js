const config = require('config');
const EmployeesService = require('../services/employees-service');
const MailSender = require('../libs/mail-sender');

module.exports = class NotifyUsers {
    constructor() {
        this.employeesService = new EmployeesService();
    }

    async votingStart() {
        try {
            const emplooyes = await this.$getEmployees();
            this.$sendNotification(this.$mapEmployees(emplooyes), 'Em suas marcas!', 'Votação iniciada! Você já pode votar no sistema!');
        } catch (error) {
            console.log(`Não foi possível notificar o INICIO da votação!`);
            throw error;
        }
    }

    async votingEnd() {
        try {
            const emplooyes = await this.$getEmployees();
            this.$sendNotification(this.$mapEmployees(emplooyes), 'Temos um ganhador!', `Que legal, Já sabemos qual o restaurante você irá almoçar hoje. Acesse o aplicativo para ficar sabendo!`);
        } catch (error) {
            console.log(`Não foi possível notificar o FINAL da votação!`);
            throw error;
        }
    }

    async $sendNotification(to, subject, text) {
        const { user } = config.get('mail');
        try {
            const mailSender = new MailSender();
            const mail = {
                from: {
                    name: 'Democratic Lunch',
                    address: user
                },
                to,
                subject,
                text,
                confirmDelivered: false
            }
            await mailSender.sendMail(mail)
        } catch (error) {
            console.log(`Não foi possível enviar notificação para os funcionários: ${JSON.stringify(to)}`)
        }
    }

    $mapEmployees(employees) {
        return employees.map(el => ({
            name: el.name,
            address: el.email
        }));
    }

    async $getEmployees() {
        try {
            const { data } = await this.employeesService.get();
            return JSON.parse(data);
        } catch (error) {
            throw error;
        }
    }
}
