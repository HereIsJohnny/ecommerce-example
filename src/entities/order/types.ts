type PostOrderDTO = {
	products: { id: number; quantity: number }[]
}

type PatchOrderDTO = {
	productId: number
	quantity: number
	action: 'update_quantity'
}

type PatchOrder = {
	id: number
	quantity: number
}

type PostOrder = {
	products: { id: number; quantity: number }[]
}

type OrderProduct = {
	id: number
	quantity: number
}

type Order = {
	products: Record<number, OrderProduct>
}

type OrderContext = {
	orderDetails?: Order
	addToCart: (product: OrderProduct) => void
	getFromCart: (productId: number) => OrderProduct | undefined
	totalItems: number
	buyOrder: () => void
}
