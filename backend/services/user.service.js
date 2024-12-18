
const { models } = require('../libs/sequelize');

class UsersService {
    constructor() {}

    async find() {
        const users = await models.User.findAll();
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
        const updatedUser = await user.update(changes);
        return updatedUser;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}


module.exports = UsersService;