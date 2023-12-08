import { BaseApiClass } from '../../lib/BaseApiClass'

export class OrderApiClass extends BaseApiClass {
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
}
