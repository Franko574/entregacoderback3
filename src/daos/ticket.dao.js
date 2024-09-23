import { ticketModel } from "../daos/models/ticket.model.js";

class TicketDaoMongo {
	async createTicket(user, cart) {
		try {
			const ticket = await ticketModel.create({
				code: Math.random().toString(36).substring(2, 15),
				purchase_datetime: Date.now(),
				amount: cart.products.reduce(
					(acc, curr) => acc + curr.quantity * curr.product.price,
					0
				),
				purchaser: user._id,
			});
			return ticket;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getTicketById(id) {
		try {
			return await ticketModel
				.findById(id)
				.populate("purchaser", "first_name last_name email");
		} catch (error) {
			throw new Error(error);
		}
	}
}

export const ticketDao = new TicketDaoMongo();
