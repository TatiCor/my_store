const { models } = require('../libs/sequelize');


class CustomersService {
    constructor() {}

    async find() {
        const customers = await models.Customer.findAll();
        if (!customers) {
            throw boom.notFound('Customers not found');
        } 
        return customers;
    }

    async create(data) {
        const newCustomer = await models.Customer.create(data);
        return newCustomer;
    }

    async findOne(id) {
        const customer = await models.Customer.findByPk(id);
        if (!customer) {
            throw boom.notFound('Customer not found');
        }
        return customer;
    }

    async update(id, changes) {
        const customer = await this.findOne(id);
        const updatedCustomer = await customer.update(changes, { where: { id } });
        return updatedCustomer;
    }

    async delete(id) {
        const customer = await this.findOne(id);
        await customer.destroy();
        return { id };
    }
}


module.exports = CustomersService;