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
