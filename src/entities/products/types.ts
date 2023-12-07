type ProductDTO = {
	id: number
	name: string
	description: string
	image: string
	price: number
	category: Category
}

type Category = {
	name: string
	order: number
}

type CategoryDTO = {
	name: string
	order: number
}

type Product = {
	id: number
	name: string
	description: string
	imageSrc: string
	price: number
	category: {
		name: string
		order: number
	}
}
