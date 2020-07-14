const factory = require("../factories");
const EmployeesService = require('../../src/services/employees-service');

const employee = factory.createEmployee();

describe('Busca de Funcionarios ', () => {
    it('Deve retornar uma lista de Funcionários', async () => {
        const employeesService = new EmployeesService();
        const axiosSpy = jest.spyOn(employeesService.axios, 'get')
            .mockImplementation(() => new Promise(resolve => resolve([employee])));
        const data = await employeesService.get();

        expect(axiosSpy).toHaveBeenCalled();
        expect(data).toEqual([employee]);
    });
});
