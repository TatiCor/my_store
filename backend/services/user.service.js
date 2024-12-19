
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');


class UsersService {
    constructor() {}

    async find() {
        const users = await models.User.findAll();
        if (!users) {
            throw boom.notFound('User not found');
        } 
        return users;
    }

    async create(data) {
        const newUser = await models.User.create(data);
        return newUser;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const updatedUser = await user.update(changes, { where: { id } });
        return updatedUser;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}


module.exports = UsersService;