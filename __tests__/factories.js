const faker = require('faker-br');

// Class seguindo o Pattern Factory
const factory = new function () {
    this.createEmployee = function () {
        //Utilizado para executar testes de integração
        const employer = {
            lockedProperties: ['id', 'locked'],
            id: 1,
            name: faker.company.companyName(),
            cpf: faker.br.cpf(),
            email: faker.internet.email(),
            locked: false
        };
        return employer;
    }

    this.createVoting = function () {
        const voting = {
            id: 1,
            closingTime: '11:00',
            votingClosed: false,
            elected: {},
            date: '7/14/2020',
            date_br: '14/07/2020',
            voteList: [
                {
                    id: 1,
                    restaurant: {
                        lockedProperties: [
                            'id',
                            'locked',
                            'howManyTimeHaveWeBeen',
                            'lastDayHaveWeBeen',
                            'lockedProperties'
                        ],
                        id: 1,
                        name: faker.company.companyName(),
                        locked: false,
                        howManyTimeHaveWeBeen: 0,
                        lastDayHaveWeBeen: null
                    },
                    count: 0
                }
            ]
        }
        return voting;
    }
}

module.exports = factory;
