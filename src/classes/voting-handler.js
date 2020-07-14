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
        return this.$decodeDateBr(this.vouting.date, this.vouting.closingTime);
    }

    async endVoting() {
        try {
            await this.voutingsService.endVoting();
        } catch (error) {
            console.log('Não foi possível Encerrar a Votação.');
            throw error;
        }
    }

    $decodeDateBr(dateEncoded = '', timeEncoded) {
        const date = dateEncoded.split('/');
        const time = timeEncoded.split(':');

        const year = date[2];
        const month = date[0];
        const day = date[1];
        const hour = time[0];
        const minute = time[1];

        return new Date(year, month, day, hour, minute);
    }

    async $getCurrentVoting() {
        try {
            const { data } = await this.voutingsService.getCurrentVoting();
            return JSON.parse(data);
        } catch (error) {
            throw error
        }
    }
}
