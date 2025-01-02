const { models } = require('../libs/sequelize');

class CategoriesService {
    constructor() {}

    async find () {
        const categories = await models.Category.findAll();
        if (!categories) {
            throw boom.notFound('Categories not found');
        }
        return categories;
    }
    async findOne (id) {
        const category = await models.Category.findByPk(id, {
            include: ['products']
        });
        if (!category) {
            throw boom.notFound('Category not found');
        }
        return category;
    }
    async create (data) {
        const newCategory = await models.Category.create(data);
        return newCategory;
    }
    async update (id, changes) {
        const category = await this.findOne(id);
        const updatedCategory = await category.update(changes);
        return updatedCategory;
    }
    async delete (id) {
        const category = await this.findOne(id);
        await category.destroy();
        return { id };
    }
}

module.exports = CategoriesService;