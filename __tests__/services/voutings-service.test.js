const factory = require("../factories");
const VoutingsService = require('../../src/services/voutings-service');

const voting = factory.createVoting();

describe('Busca da Votação Atual ', () => {
    describe('getCurrentVoting', () => {
        it('Deve retornar um objeto com a votação atual', async () => {
            const votingsService = new VoutingsService();
            const axiosSpy = jest.spyOn(votingsService.axios, 'get')
                .mockImplementation(() => new Promise(resolve => resolve(JSON.stringify(voting))));
            const data = await votingsService.getCurrentVoting();

            expect(axiosSpy).toHaveBeenCalled();
            expect(data).toEqual(JSON.stringify(voting));
        });
    });
});
