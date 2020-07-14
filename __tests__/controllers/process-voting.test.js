const config = require('config');
const ProcessVoting = require('../../src/controllers/process-voting');
const NotifyUsers = require('../../src/classes/notify-users');
const VotingsHandler = require('../../src/classes/voting-handler');

describe('Processamento da Votação', () => {

    it('Deve retornar "false", quando a votação ainda NÃO FOI INICIADA', async () => {
        const processVoting = new ProcessVoting();

        const spyIsVotingStarted = jest.spyOn(processVoting.votingHandler, 'isVotingStarted')
            .mockResolvedValue(false);

        const spyCanEndVoting = jest.spyOn(processVoting.votingHandler, 'canEndVoting')
            .mockReturnValue(false);

        const spyEndVoting = jest.spyOn(processVoting.votingHandler, 'endVoting')
            .mockResolvedValue();

        const spyVotingStart = jest.spyOn(processVoting.notifyUsers, 'votingStart')
            .mockResolvedValue();

        const spyVotingEnd = jest.spyOn(processVoting.notifyUsers, 'votingEnd')
            .mockResolvedValue();

        const data = await processVoting.process();

        expect(data).toBe(false);
        expect(spyIsVotingStarted).toHaveBeenCalled();
        expect(spyCanEndVoting).toHaveBeenCalledTimes(0);
        expect(spyEndVoting).toHaveBeenCalledTimes(0);
        expect(spyVotingStart).toHaveBeenCalledTimes(0);
        expect(spyVotingEnd).toHaveBeenCalledTimes(0);
    });

    it('Deve retornar "true", quando a votação for FINALIZADA', async () => {
        const processVoting = new ProcessVoting();

        const spyIsVotingStarted = jest.spyOn(processVoting.votingHandler, 'isVotingStarted')
            .mockResolvedValue(true);

        const spyCanEndVoting = jest.spyOn(processVoting.votingHandler, 'canEndVoting')
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        const spyEndVoting = jest.spyOn(processVoting.votingHandler, 'endVoting')
            .mockResolvedValue();

        const spyVotingStart = jest.spyOn(processVoting.notifyUsers, 'votingStart')
            .mockResolvedValue();

        const spyVotingEnd = jest.spyOn(processVoting.notifyUsers, 'votingEnd')
            .mockResolvedValue();

        const data = await processVoting.process();

        expect(data).toBe(true);
        expect(spyIsVotingStarted).toHaveBeenCalled();
        expect(spyCanEndVoting).toHaveBeenCalledTimes(2);
        expect(spyEndVoting).toHaveBeenCalled();
        expect(spyVotingStart).toHaveBeenCalled();
        expect(spyVotingEnd).toHaveBeenCalled();
    });
});
