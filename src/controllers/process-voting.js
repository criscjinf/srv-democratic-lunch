const config = require('config');
const NotifyUsers = require('../classes/notify-users');
const VotingsHandler = require('../classes/voting-handler');

module.exports = class ProcessVoting {
    constructor() {
        this.notifyUsers = new NotifyUsers();
        this.votingHandler = new VotingsHandler();
    }

    async process() {
        try {
            if (await this.votingHandler.isVotingStarted()) {
                this.notifyUsers.votingStart();

                await this.$doWaitEndVoting();
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    async $doWaitEndVoting() {
        return new Promise((resolve, reject) => {
            this.$execWithLoop(async () => {
                try {
                    let restauranteWinner = await this.votingHandler.endVoting();
                    this.notifyUsers.votingEnd(restauranteWinner);
                    resolve();
                } catch (error) {
                    console.log(`Não foi possível finalizar a votação!`);
                    reject(error);
                }
            });
        });
    }

    $execWithLoop(callback) {
        setTimeout(() => {
            try {
                if (this.votingHandler.canEndVoting()) {
                    callback();
                } else {
                    console.log('Aguardando término da votação!');
                    this.$execWithLoop(callback);
                }
            } catch (error) {
                console.log('Erro ao executar Loop de verificação de encerramento da votação!');
                throw error;
            }
        }, config.get('service').interval * 1000);
    }
}
