const factory = require("../factories");
const NotifyUsers = require('../../src/classes/notify-users');
const MailSender = require('../../src/libs/mail-sender');

jest.mock('../../src/libs/mail-sender');  // MailSender is now a mock constructor

const employee = factory.createEmployee();
const restaurant = factory.createRestaurant();

describe('Class NotifyUser', () => {

    beforeEach(() => {
        MailSender.mockClear();
    });

    it('Deve notificar o inicio da Votação', async () => {
        const notifyUsers = new NotifyUsers();
        const spy = jest.spyOn(notifyUsers, '$getEmployees')
            .mockImplementation(() => new Promise(resolve => resolve([employee])));

        await notifyUsers.votingStart();
        expect(spy).toHaveBeenCalled();
        expect(MailSender).toHaveBeenCalled();
    });

    it('Deve notificar o final da Votação', async () => {
        const notifyUsers = new NotifyUsers();
        const spy = jest.spyOn(notifyUsers, '$getEmployees')
            .mockImplementation(() => new Promise(resolve => resolve([employee])));

        await notifyUsers.votingEnd(restaurant);
        expect(spy).toHaveBeenCalled();
        expect(MailSender).toHaveBeenCalled();
    });
});
