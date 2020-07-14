const factory = require("../factories");
const VotingsHandler = require('../../src/classes/voting-handler');

const voting = factory.createVoting();

describe('Class VotingsHandler', () => {
    describe('isVotingStarted', () => {
        it('Deve retornar "true" caso EXISTA votação em aberto', async () => {
            const votingHandler = new VotingsHandler();
            const spy = jest.spyOn(votingHandler, '$getCurrentVoting')
                .mockImplementation(() => new Promise(resolve => resolve(voting)));

            const result = await votingHandler.isVotingStarted();

            expect(spy).toHaveBeenCalled();
            expect(result).toBe(true);
            spy.mockRestore();
        });

        it('Deve retornar "false" caso NÃO exista votação em aberto', async () => {
            const votingHandler = new VotingsHandler();
            const spy = jest.spyOn(votingHandler, '$getCurrentVoting')
                .mockImplementation(() => new Promise(resolve => resolve()));

            const result = await votingHandler.isVotingStarted();

            expect(spy).toHaveBeenCalled();
            expect(result).toBe(false);
            spy.mockRestore();
        });
    });
    describe('canEndVoting', () => {
        it('Deve retornar "true" caso a data atual for MAIOR que a data final da votação', async () => {
            const votingHandler = new VotingsHandler();
            const spy = jest.spyOn(votingHandler, '$endDate')
                .mockImplementation(() => new Date(2000, 1, 1));

            const result = await votingHandler.canEndVoting();

            expect(spy).toHaveBeenCalled();
            expect(result).toBe(true);
            spy.mockRestore();
        });

        it('Deve retornar "false" caso a data atual for MENOR que a data final da votação', async () => {
            const votingHandler = new VotingsHandler();
            const spy = jest.spyOn(votingHandler, '$endDate')
                .mockImplementation(() => new Date(3000, 1, 1));

            const result = await votingHandler.canEndVoting();

            expect(spy).toHaveBeenCalled();
            expect(result).toBe(false);
            spy.mockRestore();
        });
    });
});