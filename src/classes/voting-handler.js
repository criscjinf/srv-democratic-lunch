const VoutingsService = require('../services/voutings-service');

module.exports = class VotingsHandler {
    constructor() {
        this.voutingsService = new VoutingsService()
        this.vouting = null;
    }

    async isVotingStarted() {
        this.vouting = await this.$getCurrentVoting();
        return !!this.vouting;
    }

    canEndVoting() {
        const currDate = new Date();
        return currDate > this.$endDate();
    }

    $endDate() {
        return this.$decodeDateBr(this.vouting.date_br, this.vouting.closingTime);
    }

    async endVoting() {
        try {
           const { data } =  await this.voutingsService.endVoting();
           return data
        } catch (error) {
            console.log('Não foi possível Encerrar a Votação.');
            throw error;
        }
    }

    $decodeDateBr(dateEncoded = '', timeEncoded) {
        const date = dateEncoded.split('/');
        const time = timeEncoded.split(':');
        const year = date[2];
        const month = date[1];
        const day = date[0];
        const hour = time[0];
        const minute = time[1];
        return new Date(`${year}-${month}-${day} ${hour}:${minute}`);
    }

    async $getCurrentVoting() {
        try {
            const { data } = await this.voutingsService.getCurrentVoting();
            return data;
        } catch (error) {
            throw error
        }
    }
}
