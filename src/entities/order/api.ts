import { BaseApiClass } from '../../lib/BaseApiClass'

class OrderApiClass extends BaseApiClass {
	public async createNewOrder(order: PostOrder) {
		return this.post<{ id: number }>('/orders', order)
	}

	public async getOrder(id: number) {
		return this.get<PostOrder>(`/orders/${id}`)
	}

	public async patchOrder(id: number, order: PatchOrder) {
		return this.patch<{}, PatchOrderDTO>(`/orders/${id}`, {
			productId: order.id,
			quantity: order.quantity,
			action: 'update_quantity',
		})
	}

	public async postOrder(order: PostOrder) {
		return this.post<{ id: number }, PostOrderDTO>(`/orders`, order)
	}

	public async buyOrder(id: number) {
		return this.post<{}, { id: number }>(`/orders/${id}/buy`, {
			id,
		})
	}
}

export const orderApi = new OrderApiClass()
