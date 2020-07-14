const axios = require('axios');
const config = require('config');

module.exports = class EmployeesService {
    constructor() {
        this.url = '/employees';
        this.baseURL = config.get('api').uri;

        this.axios = axios.create({ baseURL: this.baseURL });
    }

    get(params = {}, config = {}) {
        return this.axios.get(this.url, {
            ...config,
            params
        });
    }
}