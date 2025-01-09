const { models } = require('../libs/sequelize');

class OrdersService {
    constructor() {}

    async find() {
        const orders = await models.Order.findAll( {
            include: [
                {
                    association: 'items', // Incluye los productos relacionados
                    through: {
                        attributes: ['amount'], // Incluye solo los campos necesarios de la tabla intermedia
                    }
                }
            ]
        });
        
        if (!orders) {
            throw boom.notFound('Orders not found');
        }
        return orders;
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: [{
                association: 'customer',
                include: ['user']
            },
                'items'
            ]
        });
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async create(data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async addItem(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

/*     async update(id, changes) {
        const order = await this.findOne(id);
        const updatedOrder = await order.update(changes);
        return updatedOrder;
    }

    async delete(id) {
        const order = await this.findOne(id);
        await order.destroy();
        return { id };
    } */
};

module.exports = OrdersService;