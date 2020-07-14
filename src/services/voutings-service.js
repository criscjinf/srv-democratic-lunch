const axios = require('axios');
const config = require('config');

module.exports = class VoutingsService {
    constructor() {
        this.url = '/votings';
        this.baseURL = config.get('api').uri;

        this.axios = axios.create({ baseURL: this.baseURL });
    }

    getCurrentVoting(config = {}) {
        return this.axios.get(`${this.url}/currentvoting`, {
            ...config
        });
    }

    endVoting(config = {}) {
        return this.axios.post(`${this.url}/endvoting`, { ...config });
    }
}
